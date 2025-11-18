package com.CVStore.CVStore.jobSeeker.service;

import com.CVStore.CVStore.jobSeeker.entity.CandidateSkill;
import com.CVStore.CVStore.jobSeeker.entity.Candidate;
import com.CVStore.CVStore.jobSeeker.entity.SkillMaster;
import com.CVStore.CVStore.jobSeeker.repository.CandidateSkillRepository;
import com.CVStore.CVStore.jobSeeker.repository.CandidateRepository;
import com.CVStore.CVStore.jobSeeker.repository.SkillMasterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CandidateSkillService {

    private final CandidateRepository candidateRepository;
    private final SkillMasterRepository skillMasterRepository;
    private final CandidateSkillRepository candidateSkillRepository;

    public void addSkillsToCandidate(Long candidateId, List<String> skillNames) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        List<String> existingSkills = candidateSkillRepository.findByCandidate_Id(candidateId)
                .stream().map(cs -> cs.getSkill().getSkillName().toLowerCase()).toList();

        for (String skillName : skillNames) {
            String normalized = skillName.trim().toLowerCase();
// skip duplicate
            if (existingSkills.contains(normalized)) {
                System.out.println("Skill already exists: " + skillName);
                continue;
            }

            // Check if skill exists in master table

            SkillMaster skill = skillMasterRepository.findBySkillNameIgnoreCase(skillName)
                    .orElseGet(() -> skillMasterRepository.save(new SkillMaster(skillName)));

            // Create link between candidate and skill
            CandidateSkill candidateSkill = new CandidateSkill();
            candidateSkill.setCandidate(candidate);
            candidateSkill.setSkill(skill);

            candidateSkillRepository.save(candidateSkill);
        }
    }

    public List<String> getCandidateSkills(Long candidateId) {
        return candidateSkillRepository.findByCandidate_Id(candidateId)
                .stream()
                .map(cs -> cs.getSkill().getSkillName())
                .distinct()
                .toList();
    }
}
