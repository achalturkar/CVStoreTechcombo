package com.CVStore.CVStore.jobSeeker.controller;


import com.CVStore.CVStore.auth.jwt.service.JwtService;

import com.CVStore.CVStore.jobSeeker.dto.CandidateAuthResponse;
import com.CVStore.CVStore.jobSeeker.dto.CandidateLoginRequest;
import com.CVStore.CVStore.jobSeeker.dto.CandidateRegisterRequest;
import com.CVStore.CVStore.jobSeeker.entity.Candidate;
import com.CVStore.CVStore.jobSeeker.service.CandidateService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/candidate")
public class CandidateAuthController {

    private final AuthenticationManager candidateAuthManager;
    private final JwtService jwtService;
    private final CandidateService candidateService;

    public CandidateAuthController(
            @Qualifier("candidateAuthManager") AuthenticationManager candidateAuthManager,
            JwtService jwtService,
            CandidateService candidateService
    ) {
        this.candidateAuthManager = candidateAuthManager;
        this.jwtService = jwtService;
        this.candidateService = candidateService;
    }

    @PostMapping("/register")
    public ResponseEntity<CandidateAuthResponse> register(@RequestBody
                                                 CandidateRegisterRequest request) {
        Candidate saved = candidateService.registerCandidate(request);
        String token = jwtService.generateToken(saved);
        return ResponseEntity.ok(new CandidateAuthResponse(
                token,
                saved.getId(),
                saved.getFullName(),
                saved.getEmail(),
                saved.getPhone()));
    }


    @PostMapping("/login")
    public ResponseEntity<CandidateAuthResponse> login(@Valid @RequestBody CandidateLoginRequest request){

        try{
            Authentication auth = candidateAuthManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            Candidate principal = (Candidate) auth.getPrincipal();
            String token = jwtService.generateToken(principal);
            return  ResponseEntity.ok(new CandidateAuthResponse(
                    token,
                    principal.getId(),
                    principal.getFullName(),
                    principal.getEmail(),
                    principal.getPhone()));

        }catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Invalid email or password");
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
//
//    @GetMapping("/me")
//    public ResponseEntity<CandidateAuthResponse> me(@AuthenticationPrincipal Candidates
//                                                   current) {
//        String token = jwtService.generateToken(current);
//        return  ResponseEntity.ok(new CandidateAuthResponse(
//                token,
//                current.getId(),
//                current.getFullName(),
//                current.getEmail(),
//                current.getPhone()));
//    }

    @GetMapping("/me")
    public ResponseEntity<CandidateAuthResponse> me(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }

        String token = authHeader.substring(7);
        String email = jwtService.extractUsername(token);

        Candidate current = candidateService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        return ResponseEntity.ok(new CandidateAuthResponse(
                token,
                current.getId(),
                current.getFullName(),
                current.getEmail(),
                current.getPhone()));
    }



}
