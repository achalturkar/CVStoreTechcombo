package com.CVStore.CVStore.jobSeeker.service;


import com.CVStore.CVStore.jobSeeker.dto.CandidateRegisterRequest;
import com.CVStore.CVStore.jobSeeker.entity.Candidate;
import com.CVStore.CVStore.jobSeeker.repository.CandidateRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CandidateService {

    private final PasswordEncoder passwordEncoder;
    private final CandidateRepository candidateRepository;



    public Candidate registerCandidate(@Valid CandidateRegisterRequest request){

        if(candidateRepository.existsByEmail(request.getEmail())){
            throw new IllegalArgumentException("Email already registered");
        }


        Candidate candidate = Candidate.builder()
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

         return candidateRepository.save(candidate);

    }

    public Optional<Candidate> findByEmail(String email) {
        return candidateRepository.findByEmail(email);
    }



}
