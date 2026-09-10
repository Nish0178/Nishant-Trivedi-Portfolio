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

    public ContactService(ContactMessageRepository repository) {
        this.repository = repository;
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

        ContactMessage saved = repository.save(entity);

        log.info("Successfully persisted contact message with id={}", saved.getId());

        return new ContactResponse(
                true,
                "Your transmission has been received and logged.",
                saved.getId()
        );
    }
}
