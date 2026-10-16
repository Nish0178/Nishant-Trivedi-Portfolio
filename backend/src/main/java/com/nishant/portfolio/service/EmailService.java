package com.nishant.portfolio.service;

import com.nishant.portfolio.entity.ContactMessage;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final ObjectProvider<JavaMailSender> mailSenderProvider;
    private final String mailTo;
    private final String mailFrom;
    private final String configUsername;
    private final String configPassword;

    @org.springframework.beans.factory.annotation.Autowired
    public EmailService(
            ObjectProvider<JavaMailSender> mailSenderProvider,
            @Value("${app.mail.to:trivedinishant880@gmail.com}") String mailTo,
            @Value("${app.mail.from:noreply@nishanttrivedi.com}") String mailFrom,
            @Value("${app.mail.username:}") String configUsername,
            @Value("${app.mail.password:}") String configPassword
    ) {
        this.mailSenderProvider = mailSenderProvider;
        this.mailTo = mailTo;
        this.mailFrom = mailFrom;
        this.configUsername = configUsername;
        this.configPassword = configPassword;
    }

    public EmailService(
            ObjectProvider<JavaMailSender> mailSenderProvider,
            String mailTo,
            String mailFrom,
            String mailUsername
    ) {
        this(mailSenderProvider, mailTo, mailFrom, mailUsername, null);
    }

    public boolean isMailConfigured() {
        if (configUsername != null && !configUsername.isBlank() && configPassword == null) {
            return !configUsername.contains("your-email");
        }

        String username = (configUsername != null && !configUsername.isBlank())
                ? configUsername
                : System.getenv("MAIL_USERNAME");
        if (username == null || username.isBlank()) {
            username = System.getProperty("MAIL_USERNAME");
        }

        String password = (configPassword != null && !configPassword.isBlank())
                ? configPassword
                : System.getenv("MAIL_PASSWORD");
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

    private void sendOwnerNotification(JavaMailSender mailSender, ContactMessage message) throws Exception {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

        helper.setFrom(mailFrom);
        helper.setTo(mailTo);
        helper.setReplyTo(message.getEmail());
        helper.setSubject("New Portfolio Contact — " + message.getName());

        String formattedTime = message.getCreatedAt() != null ? message.getCreatedAt().format(FORMATTER) : "Just now";
        String plainText = String.format(
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

        String safeName = escapeHtml(message.getName());
        String safeEmail = escapeHtml(message.getEmail());
        String safeSubject = escapeHtml(message.getSubject());
        String safeMessage = escapeHtml(message.getMessage()).replace("\n", "<br/>");
        String safeTime = escapeHtml(formattedTime);

        String htmlText = """
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fafaf9; margin: 0; padding: 24px; color: #111110; }
                .container { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
                .header { background: #111110; color: #ffffff; padding: 24px; border-bottom: 2px solid #d97706; }
                .header h1 { margin: 0; font-size: 16px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #ffffff; }
                .header p { margin: 4px 0 0; font-size: 12px; color: #a1a1aa; font-family: monospace; }
                .body-content { padding: 28px 24px; }
                .meta-table { width: 100%%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
                .meta-table td { padding: 8px 12px; border-bottom: 1px solid #f4f4f5; }
                .meta-table td.label { font-family: monospace; font-size: 11px; text-transform: uppercase; color: #71717a; width: 100px; font-weight: 600; }
                .meta-table td.value { color: #18181b; font-weight: 500; }
                .message-box { background: #fafaf9; border-left: 3px solid #d97706; padding: 16px; border-radius: 4px 8px 8px 4px; font-size: 14px; line-height: 1.6; color: #27272a; margin-top: 16px; }
                .footer { background: #f4f4f5; padding: 16px 24px; font-size: 11px; color: #71717a; border-top: 1px solid #e4e4e7; line-height: 1.5; }
                a { color: #d97706; text-decoration: none; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>New Portfolio Contact</h1>
                  <p>Inquiry received from Nishant Trivedi Portfolio</p>
                </div>
                <div class="body-content">
                  <table class="meta-table">
                    <tr><td class="label">From</td><td class="value">%s</td></tr>
                    <tr><td class="label">Email</td><td class="value"><a href="mailto:%s">%s</a></td></tr>
                    <tr><td class="label">Subject</td><td class="value">%s</td></tr>
                    <tr><td class="label">Timestamp</td><td class="value">%s</td></tr>
                  </table>
                  <div style="font-size: 11px; font-family: monospace; text-transform: uppercase; color: #71717a; font-weight: 600; margin-top: 16px;">Message</div>
                  <div class="message-box">
                    %s
                  </div>
                </div>
                <div class="footer">
                  This transmission originated from the contact form at <a href="https://nishanttrivedi.com">nishanttrivedi.com</a>.<br/>
                  Reply directly to this email to respond to <strong>%s</strong> (%s).
                </div>
              </div>
            </body>
            </html>
            """.formatted(safeName, safeEmail, safeEmail, safeSubject, safeTime, safeMessage, safeName, safeEmail);

        helper.setText(plainText, htmlText);
        mailSender.send(mimeMessage);
    }

    private void sendVisitorAcknowledgement(JavaMailSender mailSender, ContactMessage message) throws Exception {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

        helper.setFrom(mailFrom);
        helper.setTo(message.getEmail());
        helper.setSubject("Message received — Nishant Trivedi Portfolio");

        String formattedTime = message.getCreatedAt() != null ? message.getCreatedAt().format(FORMATTER) : "Just now";
        String plainText = String.format(
                "Hi %s,\n\n" +
                "Thank you for reaching out through Nishant's portfolio.\n\n" +
                "Your message has been received successfully. Nishant will review your message and get back to you as soon as possible.\n" +
                "Submitted on: %s\n\n" +
                "Best regards,\n" +
                "Nishant Trivedi\n" +
                "Software Engineer · Full-Stack & Systems\n" +
                "https://github.com/Nish0178\n",
                message.getName(),
                formattedTime
        );

        String safeName = escapeHtml(message.getName());
        String safeSubject = escapeHtml(message.getSubject());
        String safeTime = escapeHtml(formattedTime);

        String htmlText = """
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fafaf9; margin: 0; padding: 24px; color: #111110; }
                .container { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
                .header { background: #111110; color: #ffffff; padding: 24px; border-bottom: 2px solid #d97706; }
                .header h1 { margin: 0; font-size: 16px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #ffffff; }
                .header p { margin: 4px 0 0; font-size: 12px; color: #a1a1aa; font-family: monospace; }
                .body-content { padding: 32px 24px; font-size: 14px; line-height: 1.65; color: #27272a; }
                .salutation { font-size: 16px; font-weight: 600; color: #18181b; margin-bottom: 16px; }
                .signoff { margin-top: 28px; padding-top: 20px; border-top: 1px solid #f4f4f5; }
                .signoff-name { font-weight: 700; color: #18181b; }
                .signoff-title { font-size: 12px; color: #71717a; margin-top: 2px; }
                .links { margin-top: 12px; font-size: 12px; }
                .links a { color: #d97706; text-decoration: none; margin-right: 12px; font-weight: 500; }
                .footer { background: #f4f4f5; padding: 14px 24px; font-size: 11px; color: #a1a1aa; border-top: 1px solid #e4e4e7; text-align: center; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Nishant Trivedi</h1>
                  <p>Software Engineer · Portfolio Contact Confirmation</p>
                </div>
                <div class="body-content">
                  <div class="salutation">Hi %s,</div>
                  <p>Thank you for reaching out through Nishant's portfolio.</p>
                  <p>Your message regarding <strong>"%s"</strong> has been received successfully. Nishant will review your message and get back to you as soon as possible.</p>
                  <p>Submitted on: %s</p>
                  <div class="signoff">
                    <div class="signoff-name">Best regards,</div>
                    <div class="signoff-name" style="margin-top: 4px;">Nishant Trivedi</div>
                    <div class="signoff-title">Software Engineer · Full-Stack & Systems Builder</div>
                    <div class="links">
                      <a href="https://github.com/Nish0178">GitHub</a>
                      <a href="https://www.linkedin.com/in/nishant-trivedi-363ba3249">LinkedIn</a>
                      <a href="https://leetcode.com/u/Nishant_trivedi01111/">LeetCode</a>
                    </div>
                  </div>
                </div>
                <div class="footer">
                  This confirmation was sent automatically because an inquiry was submitted with this address on nishanttrivedi.com.
                </div>
              </div>
            </body>
            </html>
            """.formatted(safeName, safeSubject, safeTime);

        helper.setText(plainText, htmlText);
        mailSender.send(mimeMessage);
    }

    private String escapeHtml(String text) {
        if (text == null) return "";
        return text.replace("&", "&amp;")
                   .replace("<", "&lt;")
                   .replace(">", "&gt;")
                   .replace("\"", "&quot;")
                   .replace("'", "&#39;");
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
