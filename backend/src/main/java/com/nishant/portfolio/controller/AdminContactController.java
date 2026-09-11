package com.nishant.portfolio.controller;

import com.nishant.portfolio.dto.ErrorResponse;
import com.nishant.portfolio.entity.ContactMessage;
import com.nishant.portfolio.repository.ContactMessageRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/messages")
public class AdminContactController {

    private final ContactMessageRepository repository;

    public AdminContactController(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        List<ContactMessage> messages = repository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMessageById(@PathVariable Long id, HttpServletRequest request) {
        Optional<ContactMessage> messageOpt = repository.findById(id);
        if (messageOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(
                    HttpStatus.NOT_FOUND.value(),
                    "Not Found",
                    "Message with id " + id + " not found",
                    request.getRequestURI()
            ));
        }
        return ResponseEntity.ok(messageOpt.get());
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<?> toggleReadStatus(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, Boolean> body,
            HttpServletRequest request
    ) {
        Optional<ContactMessage> messageOpt = repository.findById(id);
        if (messageOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(
                    HttpStatus.NOT_FOUND.value(),
                    "Not Found",
                    "Message with id " + id + " not found",
                    request.getRequestURI()
            ));
        }

        ContactMessage msg = messageOpt.get();
        if (body != null && body.containsKey("isRead")) {
            msg.setRead(body.get("isRead"));
        } else {
            msg.setRead(!msg.isRead());
        }

        ContactMessage updated = repository.save(msg);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id, HttpServletRequest request) {
        if (!repository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(
                    HttpStatus.NOT_FOUND.value(),
                    "Not Found",
                    "Message with id " + id + " not found",
                    request.getRequestURI()
            ));
        }

        repository.deleteById(id);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Message " + id + " deleted successfully"
        ));
    }
}
