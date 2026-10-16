package com.nishant.portfolio.service;

import com.nishant.portfolio.entity.ContactMessage;
import jakarta.mail.Message;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.List;
import java.util.Properties;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

class EmailServiceTest {

    private Session createMailSession() {
        return Session.getInstance(new Properties());
    }

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
    @DisplayName("EmailService sends HTML owner and visitor emails with correct headers and reply-to")
    void testEmailSentWhenConfigured() throws Exception {
        JavaMailSender mailSender = Mockito.mock(JavaMailSender.class);
        Mockito.when(mailSender.createMimeMessage()).thenAnswer(inv -> new MimeMessage(createMailSession()));

        @SuppressWarnings("unchecked")
        ObjectProvider<JavaMailSender> provider = Mockito.mock(ObjectProvider.class);
        Mockito.when(provider.getIfAvailable()).thenReturn(mailSender);

        EmailService service = new EmailService(provider, "owner@example.com", "noreply@nishanttrivedi.com", "valid-user@example.com");
        assertTrue(service.isMailConfigured());

        ContactMessage msg = new ContactMessage("Alice Smith", "alice@example.com", "Full Stack Inquiry", "Hello Nishant, love the work!", "127.0.0.1");
        msg.setId(42L);

        EmailService.EmailDeliveryResult result = service.sendContactNotifications(msg);

        assertTrue(result.isSuccess());
        assertEquals("SENT", result.getStatus());
        assertNull(result.getError());

        // Should have sent 2 MimeMessages: owner notification + visitor acknowledgement
        ArgumentCaptor<MimeMessage> messageCaptor = ArgumentCaptor.forClass(MimeMessage.class);
        Mockito.verify(mailSender, Mockito.times(2)).send(messageCaptor.capture());

        List<MimeMessage> sentMessages = messageCaptor.getAllValues();
        assertEquals(2, sentMessages.size());

        // 1. Owner notification verification
        MimeMessage ownerMessage = sentMessages.get(0);
        assertEquals("owner@example.com", ((InternetAddress) ownerMessage.getRecipients(Message.RecipientType.TO)[0]).getAddress());
        assertEquals("New Portfolio Contact — Alice Smith", ownerMessage.getSubject());
        assertNotNull(ownerMessage.getReplyTo());
        assertEquals("alice@example.com", ((InternetAddress) ownerMessage.getReplyTo()[0]).getAddress());

        // 2. Visitor confirmation verification
        MimeMessage visitorMessage = sentMessages.get(1);
        assertEquals("alice@example.com", ((InternetAddress) visitorMessage.getRecipients(Message.RecipientType.TO)[0]).getAddress());
        assertEquals("Message received — Nishant Trivedi Portfolio", visitorMessage.getSubject());
    }

    @Test
    @DisplayName("EmailService safely handles delivery exceptions without throwing")
    void testEmailHandlesExceptionSafely() {
        JavaMailSender mailSender = Mockito.mock(JavaMailSender.class);
        Mockito.when(mailSender.createMimeMessage()).thenAnswer(inv -> new MimeMessage(createMailSession()));
        Mockito.doThrow(new RuntimeException("SMTP authentication failed")).when(mailSender).send(any(MimeMessage.class));

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
