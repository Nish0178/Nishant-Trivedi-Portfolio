package com.nishant.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    @Value("${app.mail.host:smtp.gmail.com}")
    private String host;

    @Value("${app.mail.port:587}")
    private int port;

    @Bean
    public JavaMailSender javaMailSender() {
        String username = System.getenv("MAIL_USERNAME");
        if (username == null || username.isBlank()) {
            username = System.getProperty("MAIL_USERNAME");
        }

        String password = System.getenv("MAIL_PASSWORD");
        if (password == null || password.isBlank()) {
            password = System.getProperty("MAIL_PASSWORD");
        }

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);

        if (username != null && !username.isBlank()) {
            mailSender.setUsername(username.trim());
        }
        if (password != null && !password.isBlank()) {
            mailSender.setPassword(password.trim());
        }

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.starttls.required", "true");
        props.put("mail.smtp.connectiontimeout", "5000");
        props.put("mail.smtp.timeout", "5000");
        props.put("mail.smtp.writetimeout", "5000");

        return mailSender;
    }
}
