package com.nishant.portfolio.service;

import com.nishant.portfolio.entity.ContactMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final ObjectProvider<JavaMailSender> mailSenderProvider;
    private final String mailTo;
    private final String mailFrom;
    private final String customUsername;

    @org.springframework.beans.factory.annotation.Autowired
    public EmailService(
            ObjectProvider<JavaMailSender> mailSenderProvider,
            @Value("${app.mail.to:trivedinishant880@gmail.com}") String mailTo,
            @Value("${app.mail.from:noreply@nishanttrivedi.com}") String mailFrom
    ) {
        this(mailSenderProvider, mailTo, mailFrom, null);
    }

    public EmailService(
            ObjectProvider<JavaMailSender> mailSenderProvider,
            String mailTo,
            String mailFrom,
            String mailUsername
    ) {
        this.mailSenderProvider = mailSenderProvider;
        this.mailTo = mailTo;
        this.mailFrom = mailFrom;
        this.customUsername = mailUsername;
    }

    public boolean isMailConfigured() {
        if (customUsername != null) {
            return !customUsername.isBlank() && !customUsername.contains("your-email");
        }

        String username = System.getenv("MAIL_USERNAME");
        if (username == null || username.isBlank()) {
            username = System.getProperty("MAIL_USERNAME");
        }

        String password = System.getenv("MAIL_PASSWORD");
        if (password == null || password.isBlank()) {
            password = System.getProperty("MAIL_PASSWORD");
        }

        return username != null && !username.isBlank() && !username.contains("your-email")
                && password != null && !password.isBlank() && !password.contains("your-password");
    }

    public EmailDeliveryResult sendContactNotifications(ContactMessage message) {
        if (!isMailConfigured()) {
            log.info("Email notifications skipped: SMTP credentials not configured (MAIL_USERNAME / MAIL_PASSWORD)");
            return new EmailDeliveryResult(false, "SKIPPED_NOT_CONFIGURED", "SMTP credentials not configured");
        }

        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        if (mailSender == null) {
            log.warn("Email notifications skipped: JavaMailSender bean is unavailable");
            return new EmailDeliveryResult(false, "SKIPPED_NOT_CONFIGURED", "JavaMailSender unavailable");
        }

        boolean ownerSuccess = false;
        boolean visitorSuccess = false;
        StringBuilder errors = new StringBuilder();

        // 1. Send Notification to Portfolio Owner
        try {
            sendOwnerNotification(mailSender, message);
            ownerSuccess = true;
            log.info("Owner notification email delivered successfully for message id={}", message.getId());
        } catch (Exception e) {
            String sanitized = e.getMessage() != null ? e.getMessage() : e.getClass().getSimpleName();
            log.error("Owner notification email delivery failed for message id={}: {}", message.getId(), sanitized);
            errors.append("Owner notification failed: ").append(sanitized).append("; ");
        }

        // 2. Send Acknowledgement to Visitor
        try {
            sendVisitorAcknowledgement(mailSender, message);
            visitorSuccess = true;
            log.info("Visitor acknowledgement email delivered successfully to {} for message id={}", message.getEmail(), message.getId());
        } catch (Exception e) {
            String sanitized = e.getMessage() != null ? e.getMessage() : e.getClass().getSimpleName();
            log.error("Visitor acknowledgement email delivery failed for message id={}: {}", message.getId(), sanitized);
            errors.append("Visitor acknowledgement failed: ").append(sanitized);
        }

        if (ownerSuccess && visitorSuccess) {
            return new EmailDeliveryResult(true, "SENT", null);
        } else if (ownerSuccess) {
            return new EmailDeliveryResult(false, "PARTIAL_OWNER_ONLY", errors.toString().trim());
        } else if (visitorSuccess) {
            return new EmailDeliveryResult(false, "PARTIAL_VISITOR_ONLY", errors.toString().trim());
        } else {
            return new EmailDeliveryResult(false, "FAILED", errors.toString().trim());
        }
    }

    private void sendOwnerNotification(JavaMailSender mailSender, ContactMessage message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(mailFrom);
        mail.setTo(mailTo);
        mail.setReplyTo(message.getEmail());
        mail.setSubject("New Portfolio Contact — " + message.getName());

        String formattedTime = message.getCreatedAt() != null ? message.getCreatedAt().format(FORMATTER) : "Just now";
        String body = String.format(
                "You have received a new contact inquiry via your engineering portfolio:\n\n" +
                "--------------------------------------------------\n" +
                "NAME:      %s\n" +
                "EMAIL:     %s\n" +
                "SUBJECT:   %s\n" +
                "TIME:      %s\n" +
                "--------------------------------------------------\n\n" +
                "MESSAGE:\n%s\n\n" +
                "--------------------------------------------------\n" +
                "Reply directly to this email to contact %s.",
                message.getName(),
                message.getEmail(),
                message.getSubject(),
                formattedTime,
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
        mail.setSubject("Message received — Nishant Trivedi Portfolio");

        String formattedTime = message.getCreatedAt() != null ? message.getCreatedAt().format(FORMATTER) : "Just now";
        String body = String.format(
                "Hello %s,\n\n" +
                "Thank you for getting in touch through my engineering portfolio.\n\n" +
                "Your message regarding \"%s\" was successfully received on %s.\n\n" +
                "I review inquiries personally and will respond when appropriate.\n\n" +
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
