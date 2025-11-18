package com.CVStore.CVStore.jobSeeker.controller;

import com.CVStore.CVStore.jobSeeker.service.CandidateSkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidate")
@RequiredArgsConstructor
public class CandidateSkillController {

    private final CandidateSkillService candidateSkillService;

    // Add multiple skills at once
    @PostMapping("/{candidateId}/skills")
    public ResponseEntity<String> addSkillsToCandidate(
            @PathVariable Long candidateId,
            @RequestBody List<String> skillNames) {

        candidateSkillService.addSkillsToCandidate(candidateId, skillNames);
        return ResponseEntity.ok("Skills added successfully");
    }

    // Get all skills of a candidate
    @GetMapping("/{candidateId}/skills")
    public ResponseEntity<List<String>> getCandidateSkills(@PathVariable Long candidateId) {
        List<String> skills = candidateSkillService.getCandidateSkills(candidateId);
        return ResponseEntity.ok(skills);
    }
}

