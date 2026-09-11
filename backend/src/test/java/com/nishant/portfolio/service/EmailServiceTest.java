package com.nishant.portfolio.service;

import com.nishant.portfolio.entity.ContactMessage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

class EmailServiceTest {

    @Test
    @DisplayName("EmailService skips delivery when SMTP credentials are not configured")
    void testEmailSkippedWhenUnconfigured() {
        @SuppressWarnings("unchecked")
        ObjectProvider<JavaMailSender> provider = Mockito.mock(ObjectProvider.class);
        EmailService service = new EmailService(provider, "owner@example.com", "noreply@example.com", "");

        assertFalse(service.isMailConfigured());

        ContactMessage msg = new ContactMessage("Alice", "alice@example.com", "Test Subject", "Test message", "127.0.0.1");
        msg.setId(1L);

        EmailService.EmailDeliveryResult result = service.sendContactNotifications(msg);

        assertFalse(result.isSuccess());
        assertEquals("SKIPPED_NOT_CONFIGURED", result.getStatus());
    }

    @Test
    @DisplayName("EmailService sends owner and visitor emails when configured")
    void testEmailSentWhenConfigured() {
        JavaMailSender mailSender = Mockito.mock(JavaMailSender.class);
        @SuppressWarnings("unchecked")
        ObjectProvider<JavaMailSender> provider = Mockito.mock(ObjectProvider.class);
        Mockito.when(provider.getIfAvailable()).thenReturn(mailSender);

        EmailService service = new EmailService(provider, "owner@example.com", "noreply@example.com", "actual-user@gmail.com");
        assertTrue(service.isMailConfigured());

        ContactMessage msg = new ContactMessage("Alice", "alice@example.com", "Test Subject", "Test message", "127.0.0.1");
        msg.setId(1L);

        EmailService.EmailDeliveryResult result = service.sendContactNotifications(msg);

        assertTrue(result.isSuccess());
        assertEquals("SENT", result.getStatus());
        assertNull(result.getError());

        // Should have sent 2 emails: owner notification + visitor acknowledgement
        Mockito.verify(mailSender, Mockito.times(2)).send(any(SimpleMailMessage.class));
    }

    @Test
    @DisplayName("EmailService safely handles delivery exceptions without throwing")
    void testEmailHandlesExceptionSafely() {
        JavaMailSender mailSender = Mockito.mock(JavaMailSender.class);
        Mockito.doThrow(new RuntimeException("SMTP authentication failed")).when(mailSender).send(any(SimpleMailMessage.class));

        @SuppressWarnings("unchecked")
        ObjectProvider<JavaMailSender> provider = Mockito.mock(ObjectProvider.class);
        Mockito.when(provider.getIfAvailable()).thenReturn(mailSender);

        EmailService service = new EmailService(provider, "owner@example.com", "noreply@example.com", "actual-user@gmail.com");

        ContactMessage msg = new ContactMessage("Alice", "alice@example.com", "Test Subject", "Test message", "127.0.0.1");
        msg.setId(1L);

        EmailService.EmailDeliveryResult result = service.sendContactNotifications(msg);

        assertFalse(result.isSuccess());
        assertEquals("FAILED", result.getStatus());
        assertTrue(result.getError().contains("SMTP authentication failed"));
    }
}
