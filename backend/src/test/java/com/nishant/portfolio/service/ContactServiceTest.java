package com.nishant.portfolio.service;

import com.nishant.portfolio.dto.ContactRequest;
import com.nishant.portfolio.dto.ContactResponse;
import com.nishant.portfolio.entity.ContactMessage;
import com.nishant.portfolio.repository.ContactMessageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

class ContactServiceTest {

    private ContactMessageRepository repository;
    private EmailService emailService;
    private ContactService contactService;

    @BeforeEach
    void setUp() {
        repository = Mockito.mock(ContactMessageRepository.class);
        emailService = Mockito.mock(EmailService.class);
        contactService = new ContactService(repository, emailService);
    }

    @Test
    @DisplayName("ContactService persists entity and returns success response")
    void testSaveContactMessage() {
        ContactRequest request = new ContactRequest(
                "Jane Doe",
                "jane@acme.org",
                "Systems Inquiry",
                "Detailed message body."
        );

        ContactMessage savedEntity = new ContactMessage(
                "Jane Doe",
                "jane@acme.org",
                "Systems Inquiry",
                "Detailed message body.",
                "127.0.0.1"
        );
        savedEntity.setId(42L);

        Mockito.when(repository.saveAndFlush(any(ContactMessage.class))).thenReturn(savedEntity);
        Mockito.when(repository.save(any(ContactMessage.class))).thenReturn(savedEntity);
        Mockito.when(emailService.sendContactNotifications(any(ContactMessage.class)))
                .thenReturn(new EmailService.EmailDeliveryResult(true, "SENT", null));

        ContactResponse response = contactService.saveContactMessage(request, "127.0.0.1");

        assertNotNull(response);
        assertTrue(response.isSuccess());
        assertEquals(42L, response.getId());
        assertEquals("Your transmission has been received and logged.", response.getMessage());

        ArgumentCaptor<ContactMessage> captor = ArgumentCaptor.forClass(ContactMessage.class);
        Mockito.verify(repository).saveAndFlush(captor.capture());

        ContactMessage captured = captor.getValue();
        assertEquals("Jane Doe", captured.getName());
        assertEquals("jane@acme.org", captured.getEmail());
        assertEquals("Systems Inquiry", captured.getSubject());
        assertEquals("Detailed message body.", captured.getMessage());
        assertEquals("127.0.0.1", captured.getIpAddress());
    }

    @Test
    @DisplayName("Email failure does not delete or discard persisted message")
    void testEmailFailurePreservesMessage() {
        ContactRequest request = new ContactRequest(
                "Bob Smith",
                "bob@example.com",
                "Architecture Consultation",
                "Need help designing high-throughput event pipeline."
        );

        ContactMessage savedEntity = new ContactMessage(
                "Bob Smith",
                "bob@example.com",
                "Architecture Consultation",
                "Need help designing high-throughput event pipeline.",
                "192.168.1.100"
        );
        savedEntity.setId(99L);

        Mockito.when(repository.saveAndFlush(any(ContactMessage.class))).thenReturn(savedEntity);
        Mockito.when(repository.save(any(ContactMessage.class))).thenReturn(savedEntity);
        // Simulate email throwing an unhandled delivery exception
        Mockito.when(emailService.sendContactNotifications(any(ContactMessage.class)))
                .thenThrow(new RuntimeException("SMTP Connection timed out"));

        ContactResponse response = contactService.saveContactMessage(request, "192.168.1.100");

        assertNotNull(response);
        assertTrue(response.isSuccess(), "Response must still succeed for the visitor");
        assertEquals(99L, response.getId());

        // Verify message was flushed to database
        Mockito.verify(repository).saveAndFlush(any(ContactMessage.class));
        // Verify delete was NEVER called
        Mockito.verify(repository, Mockito.never()).delete(any(ContactMessage.class));
        Mockito.verify(repository, Mockito.never()).deleteById(any());

        // Verify error status was updated on entity
        assertEquals("FAILED", savedEntity.getEmailStatus());
        assertTrue(savedEntity.getEmailError().contains("SMTP Connection timed out"));
    }
}
