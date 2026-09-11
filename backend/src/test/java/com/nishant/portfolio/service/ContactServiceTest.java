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

        Mockito.when(repository.save(any(ContactMessage.class))).thenReturn(savedEntity);
        Mockito.when(emailService.sendContactNotifications(any(ContactMessage.class)))
                .thenReturn(new EmailService.EmailDeliveryResult(true, "SENT", null));

        ContactResponse response = contactService.saveContactMessage(request, "127.0.0.1");

        assertNotNull(response);
        assertTrue(response.isSuccess());
        assertEquals(42L, response.getId());
        assertEquals("Your transmission has been received and logged.", response.getMessage());

        ArgumentCaptor<ContactMessage> captor = ArgumentCaptor.forClass(ContactMessage.class);
        Mockito.verify(repository, Mockito.atLeastOnce()).save(captor.capture());

        ContactMessage captured = captor.getAllValues().get(0);
        assertEquals("Jane Doe", captured.getName());
        assertEquals("jane@acme.org", captured.getEmail());
        assertEquals("Systems Inquiry", captured.getSubject());
        assertEquals("Detailed message body.", captured.getMessage());
        assertEquals("127.0.0.1", captured.getIpAddress());
    }
}
