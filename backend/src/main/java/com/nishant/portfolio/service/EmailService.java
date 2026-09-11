package com.nishant.portfolio.service;

import com.nishant.portfolio.entity.ContactMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final ObjectProvider<JavaMailSender> mailSenderProvider;
    private final String mailTo;
    private final String mailFrom;
    private final String mailUsername;

    public EmailService(
            ObjectProvider<JavaMailSender> mailSenderProvider,
            @Value("${app.mail.to:trivedinishant880@gmail.com}") String mailTo,
            @Value("${app.mail.from:noreply@nishanttrivedi.com}") String mailFrom,
            @Value("${spring.mail.username:}") String mailUsername
    ) {
        this.mailSenderProvider = mailSenderProvider;
        this.mailTo = mailTo;
        this.mailFrom = mailFrom;
        this.mailUsername = mailUsername;
    }

    public boolean isMailConfigured() {
        return mailUsername != null && !mailUsername.isBlank() && !mailUsername.contains("your-email");
    }

    public EmailDeliveryResult sendContactNotifications(ContactMessage message) {
        if (!isMailConfigured()) {
            log.info("Email notifications skipped: SMTP credentials not configured for MAIL_USERNAME");
            return new EmailDeliveryResult(false, "SKIPPED_NOT_CONFIGURED", "SMTP credentials not configured");
        }

        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        if (mailSender == null) {
            log.warn("Email notifications skipped: JavaMailSender bean is unavailable");
            return new EmailDeliveryResult(false, "SKIPPED_NOT_CONFIGURED", "JavaMailSender unavailable");
        }

        try {
            // 1. Send Notification to Portfolio Owner
            sendOwnerNotification(mailSender, message);

            // 2. Send Acknowledgement to Visitor
            sendVisitorAcknowledgement(mailSender, message);

            log.info("Successfully delivered contact emails for transmission id={}", message.getId());
            return new EmailDeliveryResult(true, "SENT", null);
        } catch (Exception e) {
            // Defensively catch email delivery issues, ensuring NO credentials are printed
            String sanitizedError = e.getMessage() != null ? e.getMessage() : e.getClass().getSimpleName();
            log.error("Email delivery failed for transmission id={}: {}", message.getId(), sanitizedError);
            return new EmailDeliveryResult(false, "FAILED", sanitizedError);
        }
    }

    private void sendOwnerNotification(JavaMailSender mailSender, ContactMessage message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(mailFrom);
        mail.setTo(mailTo);
        mail.setReplyTo(message.getEmail());
        mail.setSubject("[Portfolio Transmission] New message from " + message.getName() + ": " + message.getSubject());

        String formattedTime = message.getCreatedAt() != null ? message.getCreatedAt().format(FORMATTER) : "Just now";
        String body = String.format(
                "You have received a new contact inquiry via your engineering portfolio:\n\n" +
                "--------------------------------------------------\n" +
                "SENDER:    %s\n" +
                "EMAIL:     %s\n" +
                "SUBJECT:   %s\n" +
                "TIMESTAMP: %s\n" +
                "IP ADDR:   %s\n" +
                "--------------------------------------------------\n\n" +
                "TRANSMISSION PAYLOAD:\n%s\n\n" +
                "--------------------------------------------------\n" +
                "You can reply directly to this email to reach %s.",
                message.getName(),
                message.getEmail(),
                message.getSubject(),
                formattedTime,
                message.getIpAddress() != null ? message.getIpAddress() : "Direct",
                message.getMessage(),
                message.getName()
        );

        mail.setText(body);
        mailSender.send(mail);
    }

    private void sendVisitorAcknowledgement(JavaMailSender mailSender, ContactMessage message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(mailFrom);
        mail.setTo(message.getEmail());
        mail.setSubject("Transmission Received — Nishant Trivedi Engineering Portfolio");

        String formattedTime = message.getCreatedAt() != null ? message.getCreatedAt().format(FORMATTER) : "Just now";
        String body = String.format(
                "Hello %s,\n\n" +
                "Thank you for reaching out through my engineering portfolio.\n\n" +
                "Your transmission regarding \"%s\" has been received and recorded in my system on %s.\n\n" +
                "I review all direct inquiries and will follow up with you as soon as possible.\n\n" +
                "Best regards,\n\n" +
                "Nishant Trivedi\n" +
                "Software Engineer · Full-Stack & Systems\n" +
                "https://github.com/Nish0178\n",
                message.getName(),
                message.getSubject(),
                formattedTime
        );

        mail.setText(body);
        mailSender.send(mail);
    }

    public static class EmailDeliveryResult {
        private final boolean success;
        private final String status;
        private final String error;

        public EmailDeliveryResult(boolean success, String status, String error) {
            this.success = success;
            this.status = status;
            this.error = error;
        }

        public boolean isSuccess() {
            return success;
        }

        public String getStatus() {
            return status;
        }

        public String getError() {
            return error;
        }
    }
}
