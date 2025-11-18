package com.CVStore.CVStore.jobSeeker.controller;

import com.CVStore.CVStore.jobSeeker.entity.PersonalInfo;
import com.CVStore.CVStore.jobSeeker.service.PersonalInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/personal-info")
public class PersonalInfoController {

    private final PersonalInfoService personalInfoService;


    @PostMapping("/candidate/{candidateId}")
    public ResponseEntity<PersonalInfo> createPersonalInfoForCandidate(
            @PathVariable Long candidateId, @RequestBody PersonalInfo personalInfo) {
        return ResponseEntity.ok(personalInfoService.createForCandidate(candidateId, personalInfo));
    }

    // ✅ Get personal info by candidate ID
//    @GetMapping("/candidate/{candidateId}")
//    public ResponseEntity<PersonalInfo> getByCandidateId(@PathVariable Long candidateId) {
//        return ResponseEntity.ok(personalInfoService.getByCandidateId(candidateId));
//    }

    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<?> getByCandidateId(@PathVariable Long candidateId) {
        PersonalInfo info = personalInfoService.getByCandidateId(candidateId);

        if (info != null) {
            return ResponseEntity.ok(info);
        } else {
            return ResponseEntity.status(404)
                    .body(Map.of("message", "No personal information found for candidate ID " + candidateId));
        }
    }


    // ✅ Update personal info using candidate ID
    @PutMapping("/candidate/{candidateId}")
    public ResponseEntity<PersonalInfo> updateByCandidateId(
            @PathVariable Long candidateId, @RequestBody PersonalInfo updatedInfo) {
        return ResponseEntity.ok(personalInfoService.updateByCandidateId(candidateId, updatedInfo));
    }

    @PostMapping
    public ResponseEntity<PersonalInfo> createPersonalInfo(@RequestBody PersonalInfo personalInfo) {
        return ResponseEntity.ok(personalInfoService.savePersonalInfo(personalInfo));
    }

    @GetMapping
    public ResponseEntity<List<PersonalInfo>> getAllPersonalInfo() {
        return ResponseEntity.ok(personalInfoService.getAllPersonalInfo());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonalInfo> getPersonalInfoById(@PathVariable Long id) {
        return personalInfoService.getPersonalInfoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonalInfo> updatePersonalInfo(
            @PathVariable Long id, @RequestBody PersonalInfo personalInfo) {
        return ResponseEntity.ok(personalInfoService.updatePersonalInfo(id, personalInfo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePersonalInfo(@PathVariable Long id) {
        personalInfoService.deletePersonalInfo(id);
        return ResponseEntity.noContent().build();
    }
}
