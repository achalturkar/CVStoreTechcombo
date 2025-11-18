package com.CVStore.CVStore.employer.controller;



import com.CVStore.CVStore.employer.dto.*;
import com.CVStore.CVStore.employer.entity.Users;
import com.CVStore.CVStore.employer.repository.UsersRepository;
import com.CVStore.CVStore.auth.jwt.service.JwtService;
import com.CVStore.CVStore.employer.service.UserOtpLoginService;
import com.CVStore.CVStore.employer.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth/recruit")
public class EmployerAuthController {
    @Qualifier("employerAuthManager")
    private final AuthenticationManager employerAuthManager;

    private final JwtService jwtService;
    private final UserService userService;
    private final UsersRepository usersRepository;

    private final UserOtpLoginService userOtpLoginService;


    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            System.out.println("🔹 Register request: " + request);
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
        } catch (Exception e) {
            e.printStackTrace(); // print exact error in console
            return ResponseEntity.internalServerError().body(null);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest
                                                      request) {
        try {
            Authentication auth = employerAuthManager.authenticate(
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

    @PostMapping("/send")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> req) {
        userOtpLoginService.sendOtpToEmail(req.get("email"));
        return ResponseEntity.ok(Map.of("message", "OTP sent to email"));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> req) {

        String email = req.get("email");
        String otp = req.get("otp");

        userOtpLoginService.verifyOtp(email, otp);

        // Get user
        var user = usersRepository.findByEmail(email).get();

        // create JWT token
        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "token", token,
                "role", user.getRole()
        ));
    }


}

