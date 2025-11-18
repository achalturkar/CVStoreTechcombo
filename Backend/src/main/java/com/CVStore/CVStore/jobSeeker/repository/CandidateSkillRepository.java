package com.CVStore.CVStore.jobSeeker.repository;

import com.CVStore.CVStore.jobSeeker.entity.CandidateSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidateSkillRepository extends JpaRepository<CandidateSkill, Long> {
    List<CandidateSkill> findByCandidate_Id(Long candidateId);

}
