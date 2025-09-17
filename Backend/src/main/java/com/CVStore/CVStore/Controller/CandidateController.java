package com.CVStore.CVStore.Controller;

import com.CVStore.CVStore.Entity.Candidate;
import com.CVStore.CVStore.Repository.CandidateRepository;
import com.CVStore.CVStore.Service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    @Autowired
    private CandidateRepository candidateRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;


    //POST Mapping

    //single resume upload manually
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

   //multiple resume file upload and auto parsing
//    @PostMapping("/parse-multiple-resumes")
//    public ResponseEntity<Map<String, String>> parseResume(@RequestParam("files") MultipartFile[] files) {
//        try {
//            if (files == null || files.length ==0) {
//                return ResponseEntity.badRequest().body(Map.of("error", "No file uploaded."));
//            }
//            if (files.length > 100) {
//                return ResponseEntity.badRequest().body(Map.of("error", "Maximum 100 files allowed."));
//            }
//            List<Map<String, String>> result = candidateService.parseMultipleResumes(files, uploadDir);
//
//            return ResponseEntity.ok((Map<String, String>) result);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Map.of("error is show", e.getMessage()));
//        }
//    }

    @PostMapping("/parse-multiple-resumes")
    public ResponseEntity<?> parseResume(@RequestParam("files") MultipartFile[] files) {
        try {
            if (files == null || files.length == 0) {
                return ResponseEntity.badRequest().body(Map.of("error", "No file uploaded."));
            }
            if (files.length > 100) {
                return ResponseEntity.badRequest().body(Map.of("error", "Maximum 100 files allowed."));
            }

            List<Map<String, String>> result = candidateService.parseMultipleResumes(files, uploadDir);

            return ResponseEntity.ok(result);  // ✅ return List instead of casting to Map
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }




    //GET Mapping

    //get all candidate using pagination
    @GetMapping("/all/{pageNo}/{pageSize}")
    public ResponseEntity<Page<Candidate>> getAllCandidates(
            @PathVariable("pageNo") int pageNo,
            @PathVariable("pageSize") int pageSize) {

        Page<Candidate> candidates = candidateRepository.findAll(PageRequest.of(pageNo, pageSize));
        return ResponseEntity.ok(candidates);
    }

    //get all candidate without pagination
    @GetMapping("/all")
    public List<Candidate> getAllCandidates() {
        return candidateService.getAllCandidates();
    }

    //get candidate using id
    @GetMapping("/{id}")
    public Optional<?> getCandidateById(@PathVariable long id) {
        return candidateService.getCandidateById(id);
    }

    //download candidate resume using id
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadCV(@PathVariable Long id) {
        return candidateService.downloadCV(id);
    }

    //View candidate by id
    @GetMapping("/view/{id}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable Long id) {
        Candidate candidate = candidateService.getCandidate(id);
        return ResponseEntity.ok(candidate);
    }

    //search candidate by skills
    @GetMapping("/all/{skills}")
    public ResponseEntity<List<Candidate>> searchBySkills(@PathVariable String skills) {
        return candidateService.searchBySkills(skills);
    }

    //search candidate by phone number
    @GetMapping("/search/{phoneNumber}")
    public ResponseEntity<?> getCandidateByMobile(@PathVariable String phoneNumber) {
        Optional<Candidate> candidate = candidateRepository.findByPhoneNumber(phoneNumber);
        if (candidate.isPresent()) {
            return ResponseEntity.ok(candidate.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Candidate not found");
        }
    }

    //search candidate by all
    @GetMapping("/search/any")
    public ResponseEntity<List<Candidate>> searchCandidates(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String skills
    ) {
        List<Candidate> results = candidateRepository.searchByFilters(id, fullName,  skills);
        return ResponseEntity.ok(results);
    }


    @GetMapping("/filter")
    public ResponseEntity<List<Candidate>> searchCandidates(
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String phoneNumber,
            @RequestParam(required = false) String skills,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) String email
    ) {
        List<Candidate> result = candidateService.filterCandidates(fullName, phoneNumber, skills, address, email);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search/name/{fullName}")
    public ResponseEntity<?> getCandidateByName(@PathVariable String fullName){
        Optional<Candidate> candidate = candidateService.searchCandidatesByFullName(fullName);
        if (candidate.isPresent()) {
            return ResponseEntity.ok(candidate.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Candidate not found");
        }
    }


//dashboard
    //Total Candidate
    @GetMapping("/count")
    public long countCandidate(){
       return candidateRepository.count();
    }

    @GetMapping("/count/{skill}")
    public long countBySkills(@PathVariable String skill){
        return candidateService.countBySkills(skill);
    }

    @GetMapping("/recent")
    public Page<Candidate> recentCandidate(
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "5", required = false) int size,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "descending", defaultValue = "true") boolean descending
    ){
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return candidateService.recent(pageable);
    }





    //DELETE Mapping

    //Delete candidate by Using Id
    @DeleteMapping("/delete/{id}")
    public void deleteCandidate(@PathVariable long id) {
         candidateService.deleteCandidate(id);
    }




    //PUT Mapping

    //update Candidate By using id
    @PutMapping("/update/{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable Long id, @RequestBody Candidate candidate) {
        return candidateService.updateCandidate(id, candidate);
    }

}
