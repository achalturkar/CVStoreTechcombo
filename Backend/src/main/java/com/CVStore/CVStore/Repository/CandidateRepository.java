package com.CVStore.CVStore.Repository;

import com.CVStore.CVStore.Entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    List<Candidate> findBySkills(String skills);

}
