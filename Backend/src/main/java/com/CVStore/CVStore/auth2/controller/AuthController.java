package com.CVStore.CVStore.auth2.controller;



import com.CVStore.CVStore.auth2.dto.*;
import com.CVStore.CVStore.auth2.entity.Users;
import com.CVStore.CVStore.auth2.repository.UsersRepository;
import com.CVStore.CVStore.auth2.service.JwtService;
import com.CVStore.CVStore.auth2.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")

public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    private final UsersRepository usersRepository;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, UserService userService, UsersRepository usersRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
        this.usersRepository = usersRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody
                                                 RegisterRequest request) {
        Users saved = userService.register(request);
        String token = jwtService.generateToken(saved);
        return ResponseEntity.ok(new AuthResponse(
                token,
                saved.getId(),
                saved.getUniqueId(),
                saved.getFullName(),
                saved.getEmail(),
                saved.getMobile(),
                saved.getCompanyName(),
                saved.getRole()));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest
                                                      request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
            );
            Users principal = (Users) auth.getPrincipal();
            String token = jwtService.generateToken(principal);
            return ResponseEntity.ok(new AuthResponse(
                    token,
                    principal.getId(),
                    principal.getUniqueId(),
                    principal.getFullName(),
                    principal.getEmail(),
                    principal.getMobile(),
                    principal.getCompanyName(),
                    principal.getRole()));
        } catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }
    @GetMapping("/me")
    public ResponseEntity<AuthResponse> me(@AuthenticationPrincipal Users
                                                   current) {
        String token = jwtService.generateToken(current);
        return ResponseEntity.ok(new AuthResponse(
                token,
                current.getId(),
                current.getUniqueId(),
                current.getFullName(),
                current.getEmail(),
                current.getMobile(),
                current.getCompanyName(),
                current.getRole()));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        try {
            userService.forgotPassword(request.getEmail());
            return ResponseEntity.ok(Map.of("message", "Password reset link sent to your email."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            userService.resetPassword(request.getToken(), request.getNewPassword());
            return ResponseEntity.ok(Map.of("message", "Password has been reset successfully."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

}

