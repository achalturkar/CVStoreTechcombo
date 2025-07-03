package com.CVStore.CVStore.Controller;

import com.CVStore.CVStore.Entity.Candidate;
import com.CVStore.CVStore.Service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

//@CrossOrigin(origins = {"http://localhost:5173", "https://cv-store-techcombo.vercel.app"})
@RestController
@RequestMapping("/api/candidate")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping(value="/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadCandidate(
            @RequestParam("file") MultipartFile file,
            @RequestParam("fullName") String fullName,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("email") String email,
            @RequestParam("experience") String experience,
            @RequestParam("address") String address,
            @RequestParam("skills") String skills
    ) {
        return candidateService.saveCandidate(file, fullName, phoneNumber, email, experience, address, skills, uploadDir);
    }

    @GetMapping("/all")
    public List<Candidate> getAllCandidates() {
        return candidateService.getAllCandidates();
    }

    @GetMapping("/{id}")
    public Optional<?> getCandidateById(@PathVariable long id) {
        return candidateService.getCandidateById(id);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadCV(@PathVariable Long id) {
        return candidateService.downloadCV(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCandidate(@PathVariable long id) {
        return candidateService.deleteCandidate(id);
    }

    @GetMapping("/all/{skills}")
    public ResponseEntity<List<Candidate>> searchBySkills(@PathVariable String skills) {
        return candidateService.searchBySkills(skills);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable Long id, @RequestBody Candidate candidate) {
        return candidateService.updateCandidate(id, candidate);
    }

    @PostMapping("/parse-resume")
    public ResponseEntity<Map<String, String>> parseResume(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "No file uploaded."));
            }
            Map<String, String> extractedData = candidateService.parseResume(file, uploadDir);
            System.out.println();
            return ResponseEntity.ok(extractedData);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error is show", e.getMessage()));
        }
    }
}
