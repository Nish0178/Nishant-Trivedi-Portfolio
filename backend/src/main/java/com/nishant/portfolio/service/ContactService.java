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

    // Abuse protection rate-limit tracking: IP -> list of submission epochs
    private final java.util.concurrent.ConcurrentHashMap<String, java.util.List<Long>> ipSubmissions = new java.util.concurrent.ConcurrentHashMap<>();
    // Duplicate submission cache: hash of (ip + email + message) -> submission epoch
    private final java.util.concurrent.ConcurrentHashMap<String, Long> recentMessageHashes = new java.util.concurrent.ConcurrentHashMap<>();

    private static final int MAX_SUBMISSIONS_PER_WINDOW = 5;
    private static final long WINDOW_MS = 10 * 60 * 1000L; // 10 minutes
    private static final long DUPLICATE_COOLDOWN_MS = 60 * 1000L; // 60 seconds

    public ContactService(ContactMessageRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    public void resetAbuseProtection() {
        ipSubmissions.clear();
        recentMessageHashes.clear();
    }

    @Transactional
    public ContactResponse saveContactMessage(ContactRequest request, String ipAddress) {
        log.info("Processing contact submission from name='{}', email='{}', subject='{}'",
                request.getName(), request.getEmail(), request.getSubject());

        // Abuse & Spam Protection: Rate limiting
        if (ipAddress != null && !ipAddress.isBlank()) {
            long now = System.currentTimeMillis();
            java.util.List<Long> timestamps = ipSubmissions.computeIfAbsent(ipAddress, k -> java.util.Collections.synchronizedList(new java.util.ArrayList<>()));
            synchronized (timestamps) {
                timestamps.removeIf(t -> now - t > WINDOW_MS);
                if (timestamps.size() >= MAX_SUBMISSIONS_PER_WINDOW) {
                    log.warn("Contact submission rate limit exceeded for IP: {}", ipAddress);
                    throw new IllegalArgumentException("Too many messages submitted from this network. Please wait a few minutes before trying again.");
                }
                timestamps.add(now);
            }

            // Duplicate message prevention
            String msgHash = ipAddress + ":" + request.getEmail().trim().toLowerCase() + ":" + request.getMessage().trim().hashCode();
            Long lastSent = recentMessageHashes.get(msgHash);
            if (lastSent != null && (now - lastSent) < DUPLICATE_COOLDOWN_MS) {
                log.warn("Duplicate contact submission prevented from IP: {}", ipAddress);
                throw new IllegalArgumentException("Duplicate message detected. Please wait a moment before sending another message.");
            }
            recentMessageHashes.put(msgHash, now);
        }

        ContactMessage entity = new ContactMessage(
                request.getName().trim(),
                request.getEmail().trim().toLowerCase(),
                request.getSubject().trim(),
                request.getMessage().trim(),
                ipAddress
        );

        // 1. Persist to PostgreSQL first - guaranteeing zero data loss
        ContactMessage saved = repository.saveAndFlush(entity);
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
            saved.setEmailError("Email dispatch error: " + (e.getMessage() != null ? e.getMessage() : "Unknown error"));
            repository.save(saved);
        }

        return new ContactResponse(
                true,
                "Your transmission has been received and logged.",
                saved.getId()
        );
    }
}
