package com.nishant.portfolio.controller;

import com.nishant.portfolio.dto.AdminUserDto;
import com.nishant.portfolio.dto.AuthResponse;
import com.nishant.portfolio.dto.ErrorResponse;
import com.nishant.portfolio.dto.LoginRequest;
import com.nishant.portfolio.entity.AdminUser;
import com.nishant.portfolio.repository.AdminUserRepository;
import com.nishant.portfolio.security.JwtService;
import com.nishant.portfolio.service.LoginAttemptService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin/auth")
public class AdminAuthController {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final LoginAttemptService loginAttemptService;

    public AdminAuthController(
            AdminUserRepository adminUserRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            LoginAttemptService loginAttemptService
    ) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.loginAttemptService = loginAttemptService;
    }

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isBlank()) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        String clientIp = getClientIp(httpRequest);

        if (loginAttemptService.isBlocked(clientIp)) {
            ErrorResponse error = new ErrorResponse(
                    HttpStatus.TOO_MANY_REQUESTS.value(),
                    "Too Many Requests",
                    "Sorry, you have failed 3 login attempts. I think you are not the admin of this profile. Please contact the admin.",
                    httpRequest.getRequestURI(),
                    0,
                    true
            );
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(error);
        }

        Optional<AdminUser> userOpt = adminUserRepository.findByEmailIgnoreCase(request.getEmail().trim());

        if (userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPasswordHash())) {
            int remaining = loginAttemptService.recordFailure(clientIp);
            boolean isNowLocked = (remaining == 0);

            String message;
            if (isNowLocked) {
                message = "Sorry, you have failed 3 login attempts. I think you are not the admin of this profile. Please contact the admin.";
            } else if (remaining == 1) {
                message = "Invalid credentials. 1 attempt remaining.";
            } else {
                message = "Invalid credentials. " + remaining + " attempts remaining.";
            }

            ErrorResponse error = new ErrorResponse(
                    HttpStatus.UNAUTHORIZED.value(),
                    "Unauthorized",
                    message,
                    httpRequest.getRequestURI(),
                    remaining,
                    isNowLocked
            );
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        loginAttemptService.recordSuccess(clientIp);

        AdminUser user = userOpt.get();
        String token = jwtService.generateToken(user.getEmail(), user.getRole());
        AdminUserDto userDto = new AdminUserDto(user.getId(), user.getEmail(), user.getRole());

        return ResponseEntity.ok(new AuthResponse(true, token, "Authentication successful", userDto));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentAdmin(HttpServletRequest httpRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            ErrorResponse error = new ErrorResponse(
                    HttpStatus.UNAUTHORIZED.value(),
                    "Unauthorized",
                    "Not authenticated",
                    httpRequest.getRequestURI()
            );
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        String email = auth.getName();
        Optional<AdminUser> userOpt = adminUserRepository.findByEmailIgnoreCase(email);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(
                    HttpStatus.NOT_FOUND.value(),
                    "Not Found",
                    "Admin user record not found",
                    httpRequest.getRequestURI()
            ));
        }

        AdminUser user = userOpt.get();
        return ResponseEntity.ok(new AdminUserDto(user.getId(), user.getEmail(), user.getRole()));
    }
}
