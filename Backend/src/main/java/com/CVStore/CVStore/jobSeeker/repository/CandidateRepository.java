package com.CVStore.CVStore.jobSeeker.repository;

import com.CVStore.CVStore.jobSeeker.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    boolean existsByEmail(String email);
    Optional<Candidate> findByEmail(String email);

}
