package com.nishant.portfolio.controller;

import com.nishant.portfolio.dto.ContactMessageDto;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/messages")
public class AdminContactController {

    private final ContactMessageRepository repository;

    public AdminContactController(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<ContactMessageDto>> getAllMessages() {
        List<ContactMessage> messages = repository.findAllByOrderByCreatedAtDesc();
        List<ContactMessageDto> dtos = messages.stream()
                .map(ContactMessageDto::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
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
        return ResponseEntity.ok(ContactMessageDto.fromEntity(messageOpt.get()));
    }

    @PatchMapping(value = {"/{id}/read", "/{id}/unread", "/{id}/status"})
    public ResponseEntity<?> updateMessageStatus(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, Object> body,
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
        String uri = request != null ? request.getRequestURI() : "";
        if (uri.endsWith("/unread")) {
            msg.setRead(false);
        } else if (body != null) {
            if (body.containsKey("status")) {
                String statusStr = String.valueOf(body.get("status"));
                msg.setRead("READ".equalsIgnoreCase(statusStr));
            } else if (body.containsKey("isRead")) {
                msg.setRead(Boolean.parseBoolean(String.valueOf(body.get("isRead"))));
            } else if (body.containsKey("read")) {
                msg.setRead(Boolean.parseBoolean(String.valueOf(body.get("read"))));
            } else {
                msg.setRead(uri.endsWith("/read") || !msg.isRead());
            }
        } else {
            msg.setRead(uri.endsWith("/read") || !msg.isRead());
        }

        ContactMessage updated = repository.save(msg);
        return ResponseEntity.ok(ContactMessageDto.fromEntity(updated));
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
