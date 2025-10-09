//package com.CVStore.CVStore.auth.controller;
//
//import com.CVStore.CVStore.auth.dto.AuthResponse;
//import com.CVStore.CVStore.auth.dto.LoginRequest;
//import com.CVStore.CVStore.auth.dto.RegisterRequest;
//import com.CVStore.CVStore.auth.entiry.Users;
//import com.CVStore.CVStore.auth.service.JwtService;
//import com.CVStore.CVStore.auth.service.UsersService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.server.ResponseStatusException;
//
//@RestController
//@RequestMapping("/api/auth")
//@RequiredArgsConstructor
//public class AuthController {
//    private final AuthenticationManager authenticationManager;
//    private final JwtService jwtService;
//    private final UsersService usersService;
//
//    @PostMapping("/register")
//    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
//        try {
//            Users saved = usersService.register(request);
//            String token = jwtService.generateToken(saved);
//            return new ResponseEntity<>(new AuthResponse(
//                    token,
//                    saved.getId(),
//                    saved.getUserId(),
//                    saved.getFullName(),
//                    saved.getEmail(),
//                    saved.getMobile(),
//                    saved.getRole()
//            ), HttpStatus.CREATED);
//        } catch (IllegalArgumentException ex) {
//            throw new ResponseStatusException(HttpStatus.CONFLICT, ex.getMessage());
//        }
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
//        try {
//            // Authenticate user
//            Authentication auth = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
//            );
//
//            // Get the authenticated user principal (which is the Users entity)
//            Users principal = (Users) auth.getPrincipal();
//            String token = jwtService.generateToken(principal);
//
//            // Construct AuthResponse correctly
//            return ResponseEntity.ok(new AuthResponse(
//                    token,
//                    principal.getId(),
//                    principal.getUserId(),
//                    principal.getFullName(),
//                    principal.getEmail(),
//                    principal.getMobile(),
//                    principal.getRole()
//            ));
//        } catch (Exception ex) {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
//        }
//    }
//
//    @GetMapping("/me")
//    public ResponseEntity<AuthResponse> me(@AuthenticationPrincipal Users current) {
//        if (current == null) {
//            // Should not happen if security is configured correctly, but good for safety
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
//        }
//        String token = jwtService.generateToken(current);
//        return ResponseEntity.ok(new AuthResponse(
//                token,
//                current.getId(),
//                current.getUserId(),
//                current.getFullName(),
//                current.getEmail(),
//                current.getMobile(),
//                current.getRole()
//        ));
//    }
//}