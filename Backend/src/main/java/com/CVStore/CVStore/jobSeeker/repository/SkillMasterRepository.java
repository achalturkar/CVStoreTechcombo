package com.CVStore.CVStore.jobSeeker.repository;

import com.CVStore.CVStore.jobSeeker.entity.SkillMaster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SkillMasterRepository extends JpaRepository<SkillMaster, Long> {
    Optional<SkillMaster> findBySkillNameIgnoreCase(String skillName);

}
