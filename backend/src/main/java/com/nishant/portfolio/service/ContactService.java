package com.nishant.portfolio.service;

import com.nishant.portfolio.dto.ContactRequest;
import com.nishant.portfolio.dto.ContactResponse;
import com.nishant.portfolio.entity.ContactMessage;
import com.nishant.portfolio.repository.ContactMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final ContactMessageRepository repository;
    private final EmailService emailService;

    public ContactService(ContactMessageRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    @Transactional
    public ContactResponse saveContactMessage(ContactRequest request, String ipAddress) {
        log.info("Processing contact submission from name='{}', email='{}', subject='{}'",
                request.getName(), request.getEmail(), request.getSubject());

        ContactMessage entity = new ContactMessage(
                request.getName().trim(),
                request.getEmail().trim().toLowerCase(),
                request.getSubject().trim(),
                request.getMessage().trim(),
                ipAddress
        );

        // 1. Persist to PostgreSQL first - guaranteeing zero data loss
        ContactMessage saved = repository.save(entity);
        log.info("Successfully persisted contact message with id={}", saved.getId());

        // 2. Defensively attempt email notifications
        try {
            EmailService.EmailDeliveryResult emailResult = emailService.sendContactNotifications(saved);
            saved.setEmailStatus(emailResult.getStatus());
            saved.setEmailError(emailResult.getError());
            repository.save(saved);
        } catch (Exception e) {
            log.warn("Non-fatal email notification error for message id={}: {}", saved.getId(), e.getMessage());
            saved.setEmailStatus("FAILED");
            saved.setEmailError("Email dispatch error");
            repository.save(saved);
        }

        return new ContactResponse(
                true,
                "Your transmission has been received and logged.",
                saved.getId()
        );
    }
}
