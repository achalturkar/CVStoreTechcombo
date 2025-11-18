package com.CVStore.CVStore.auth.jwt.config;

import com.CVStore.CVStore.jobSeeker.entity.Candidate;
import com.CVStore.CVStore.jobSeeker.repository.CandidateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CandidateUserDetailsService implements UserDetailsService {

    private final CandidateRepository candidateRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("🔥 CandidateUserDetailsService called for: " + email);

        Candidate candidate = candidateRepository.findByEmail(email)
                .orElseThrow(() -> {
                    return new UsernameNotFoundException("Candidate not found");
                });

        return candidate;
    }



}
