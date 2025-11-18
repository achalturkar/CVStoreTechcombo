package com.CVStore.CVStore.jobSeeker.repository;

import com.CVStore.CVStore.jobSeeker.entity.PersonalInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonalInfoRepository extends JpaRepository<PersonalInfo, Long> {
    Optional<PersonalInfo> findByCandidateId(Long candidateId);

}
