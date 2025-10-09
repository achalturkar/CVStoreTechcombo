package com.CVStore.CVStore.candidate.Controller;

import com.CVStore.CVStore.candidate.Dto.UploadSummary;
import com.CVStore.CVStore.candidate.Entity.Candidate;
import com.CVStore.CVStore.candidate.Repository.CandidateRepository;
import com.CVStore.CVStore.candidate.Service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }




    //-------GET Mapping----------

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
        return candidateService.getAllCandidates(Sort.by(Sort.Direction.DESC, "id"));
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




    @GetMapping("/filter")
    public Page<Candidate> searchCandidates(
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String education,
            @RequestParam(required = false) String skills,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String experience,
            @RequestParam(required = false) String address,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return candidateRepository.searchWithFilters(
                fullName, education, skills, company, experience, address, pageable
        );
    }

//    @GetMapping("/filter")
//    public Page<Candidate> searchCandidates(
//            @RequestParam(required = false) String keyword, // This is the main search bar query
//            @RequestParam(required = false) String fullName,
//            @RequestParam(required = false) String education,
//            @RequestParam(required = false) String skills,
//            @RequestParam(required = false) String company,
//            @RequestParam(required = false) Integer experienceMin, // Changed to Integer
//            @RequestParam(required = false) String address,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size
//    ) {
//        Pageable pageable = PageRequest.of(page, size);
//        // Call the new, powerful repository method
//        return candidateRepository.searchWithTsVector(
//                keyword, fullName, education, skills, company, experienceMin, address, pageable
//        );
//    }

    //all
//
    @GetMapping("/search/filter")
    public Page<Candidate> searchCandidates(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String education,
            @RequestParam(required = false) String skills,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String experience,
            @RequestParam(required = false) String designation,
            @RequestParam(required = false) String address,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return candidateRepository.searchCandidates(
                keyword, fullName, education, skills, company, experience, designation, address, pageable
        );
    }

//    @GetMapping("/search/filter")
//    public Page<Candidate> searchCandidates(String keyword, Pageable pageable) {
//        if (keyword == null || keyword.isBlank()) {
//            return candidateRepository.findAll(pageable);
//        }
//
//        // Convert spaces into AND operator for tsquery
//        String tsQuery = Arrays.stream(keyword.trim().split("\\s+"))
//                .map(String::toLowerCase)
//                .collect(Collectors.joining(" & "));
//
//        return candidateRepository.searchCandidatesNative(keyword, tsQuery, pageable);
//    }







    @GetMapping("/search/name/{fullName}")
    public ResponseEntity<?> getCandidateByName(@PathVariable String fullName){
        Optional<Candidate> candidate = candidateService.searchCandidatesByFullName(fullName);
        if (candidate.isPresent()) {
            return ResponseEntity.ok(candidate.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Candidate not found");
        }
    }

    //---search for navbar---
//    @GetMapping("/search")
//    public ResponseEntity<List<Candidate>> searchCandidates(@RequestParam String keyword,
//                                                            @RequestParam(defaultValue = "10") int size) {
//        List<Candidate> results = candidateRepository.searchCandidates(keyword, PageRequest.of(0, size));
//        return ResponseEntity.ok(results);
//    }

    //-------Search candidate into different page---------
//    @GetMapping("/search")
//    public ResponseEntity<Page<Candidate>> searchCandidates(@RequestParam String keyword,
//                                                            @RequestParam(defaultValue = "0") int page,
//                                                            @RequestParam(defaultValue = "10") int size) {
//        Page<Candidate> results = candidateRepository.searchCandidatesPage(keyword, PageRequest.of(page, size));
//        return ResponseEntity.ok(results);
//    }





//----------dashboard-----------
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





    //----------DELETE Mapping----------

    //Delete candidate by Using Id
    @DeleteMapping("/delete/{id}")
    public void deleteCandidate(@PathVariable long id) {
         candidateService.deleteCandidate(id);
    }




    //-------PUT Mapping-----

    //update Candidate By using id
    @PutMapping("/update/{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable Long id, @RequestBody Candidate candidate) {
        return candidateService.updateCandidate(id, candidate);
    }


//    visual

    @GetMapping("/visuals")
    public List<UploadSummary> getResumeUploads(
            @RequestParam(defaultValue = "daily") String filter) {
        return candidateService.getUploads(filter);
    }


    @GetMapping("/viewResume/{id}")
    public ResponseEntity<Resource> viewResume(@PathVariable Long id) {
        try {
            Optional<Candidate> optional = candidateRepository.findById(id);
            if (optional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            Path filePath = Paths.get(optional.get().getFilePath());
            if (!Files.exists(filePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            Resource resource = new UrlResource(filePath.toUri());

            // Detect MIME type (PDF, DOCX, etc.)
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filePath.getFileName() + "\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



}
