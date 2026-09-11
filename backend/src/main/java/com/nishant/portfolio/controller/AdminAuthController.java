package com.nishant.portfolio.controller;

import com.nishant.portfolio.dto.AdminUserDto;
import com.nishant.portfolio.dto.AuthResponse;
import com.nishant.portfolio.dto.ErrorResponse;
import com.nishant.portfolio.dto.LoginRequest;
import com.nishant.portfolio.entity.AdminUser;
import com.nishant.portfolio.repository.AdminUserRepository;
import com.nishant.portfolio.security.JwtService;
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

    public AdminAuthController(
            AdminUserRepository adminUserRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        Optional<AdminUser> userOpt = adminUserRepository.findByEmailIgnoreCase(request.getEmail().trim());

        if (userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPasswordHash())) {
            ErrorResponse error = new ErrorResponse(
                    HttpStatus.UNAUTHORIZED.value(),
                    "Unauthorized",
                    "Invalid email or password",
                    httpRequest.getRequestURI()
            );
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

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
