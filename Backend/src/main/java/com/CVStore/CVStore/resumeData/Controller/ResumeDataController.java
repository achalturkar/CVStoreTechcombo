package com.CVStore.CVStore.resumeData.Controller;

import com.CVStore.CVStore.resumeData.Dto.ResumeFilterRequest;
import com.CVStore.CVStore.resumeData.Dto.UploadSummary;
import com.CVStore.CVStore.resumeData.Entity.ResumeData;
import com.CVStore.CVStore.resumeData.Repository.ResumeDataRepository;
import com.CVStore.CVStore.resumeData.Service.ResumeDataService;
import com.CVStore.CVStore.resumeData.Service.ResumeService;
import com.CVStore.CVStore.resumeData.Service.ResumeServiceImpl;
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

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

//@CrossOrigin(origins = {"http://localhost:5173", "https://cv-store-techcombo.vercel.app"})
@RestController
@RequestMapping("/api/resume-data")
public class ResumeDataController {

    @Autowired
    private ResumeDataService resumeDataService;

    @Autowired
    private ResumeDataRepository resumeDataRepository;

    @Autowired
    private ResumeServiceImpl resumeService;

    @Value("${file.upload-dir}")
    private String uploadDir;







    //POST Mapping

    @GetMapping("/search")
    public ResponseEntity<?> search(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,

            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer experience,
            @RequestParam(required = false) List<String> company,
            @RequestParam(required = false) List<String> education,
            @RequestParam(required = false) List<String> designation,
            @RequestParam(required = false) List<String> location
    ) {

        ResumeFilterRequest req = new ResumeFilterRequest();
        req.setKeyword(keyword);
        req.setCompanies(company);
        req.setEducations(education);
        req.setDesignations(designation);
        req.setLocations(location);
        req.setExperience(experience);

        Page<ResumeData> result = resumeService.filterResumes(req, page, size);

        return ResponseEntity.ok(result);
    }


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
        return resumeDataService.saveCandidate(file, fullName, phoneNumber, email, experience, address, skills, uploadDir);
    }



//    @PostMapping("/parse-multiple-resumes")
//    public ResponseEntity<?> parseResume(@RequestParam("files") MultipartFile[] files) {
//        try {
//            if (files == null || files.length == 0) {
//                return ResponseEntity.badRequest().body(Map.of("error", "No file uploaded."));
//            }
//            if (files.length > 500) {
//                return ResponseEntity.badRequest().body(Map.of("error", "Maximum 100 files allowed."));
//            }
//
//            List<Map<String, String>> result = resumeDataService.parseMultipleResumes(files, uploadDir);
//
//            return ResponseEntity.ok(result);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Map.of("error", e.getMessage()));
//        }
//    }
//
//


    @PostMapping("/parse-multiple-resumes")
    public ResponseEntity<?> parseResume(@RequestParam("files") MultipartFile[] files) {
        try {
            if (files == null || files.length == 0) {
                return ResponseEntity.badRequest().body(Map.of("error", "No file uploaded."));
            }
            if (files.length > 500) {
                return ResponseEntity.badRequest().body(Map.of("error", "Maximum 500 files allowed."));
            }

            Map<String, Object> response = resumeDataService.parseMultipleResumes(files, uploadDir);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    //-------GET Mapping----------

    //get all candidate using pagination
    @GetMapping("/all/{pageNo}/{pageSize}")
    public ResponseEntity<Page<ResumeData>> getAllCandidates(
            @PathVariable("pageNo") int pageNo,
            @PathVariable("pageSize") int pageSize) {

        Page<ResumeData> candidates = resumeDataRepository.findAll(PageRequest.of(pageNo, pageSize));
        return ResponseEntity.ok(candidates);
    }


    @GetMapping("/all")
    public ResponseEntity<List<ResumeData>> getAllCandidates() {
        try {
            List<ResumeData> candidates = resumeDataService.getAllCandidates(Sort.by(Sort.Direction.DESC, "id"));
            return ResponseEntity.ok(candidates);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    //get candidate using id
    @GetMapping("/{id}")
    public Optional<?> getCandidateById(@PathVariable long id) {
        return resumeDataService.getCandidateById(id);
    }

    //download candidate resume using id
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadCV(@PathVariable Long id) {
        return resumeDataService.downloadCV(id);
    }



    @GetMapping("/view/{id}")
    public ResponseEntity<byte[]> viewResumes(@PathVariable Long id) throws IOException {
        ResumeData resume = resumeDataRepository.findById(id).orElse(null);
        if (resume == null) return ResponseEntity.notFound().build();

        Path path = Paths.get(resume.getFilePath());
        byte[] fileContent = Files.readAllBytes(path);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.add("Content-Disposition", "inline; filename=resume.pdf");
        headers.add("X-Frame-Options", "ALLOWALL");  // IMPORTANT

        return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
    }





    @GetMapping("/filter")
    public Page<ResumeData> searchCandidates(
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
        return resumeDataRepository.searchWithFilters(
                fullName, education, skills, company, experience, address, pageable
        );
    }

    @GetMapping("/search/filter")
    public Page<ResumeData> searchCandidates(
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
        return resumeDataRepository.searchResumeData(
                keyword, fullName, education, skills, company, experience, designation, address, pageable
        );
    }


    @GetMapping("/search/name/{fullName}")
    public ResponseEntity<?> getCandidateByName(@PathVariable String fullName){
        Optional<ResumeData> candidate = resumeDataService.searchCandidatesByFullName(fullName);
        if (candidate.isPresent()) {
            return ResponseEntity.ok(candidate.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Candidate not found");
        }
    }





//----------dashboard-----------
    //Total Candidate
    @GetMapping("/count")
    public long countCandidate(){
       return resumeDataRepository.count();
    }

    @GetMapping("/count/{skill}")
    public long countBySkills(@PathVariable String skill){
        return resumeDataService.countBySkills(skill);
    }

    @GetMapping("/recent")
    public Page<ResumeData> recentCandidate(
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "5", required = false) int size,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "descending", defaultValue = "true") boolean descending
    ){
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return resumeDataService.recent(pageable);
    }





    //----------DELETE Mapping----------

    //Delete candidate by Using Id

    @DeleteMapping("/delete/{id}")
    public void deleteCandidate(@PathVariable long id) {
         resumeDataService.deleteCandidate(id);
    }






    //-------PUT Mapping-----

    //update Candidate By using id
//    @PutMapping("/update/{id}")
//    public ResponseEntity<ResumeData> updateCandidate(@PathVariable Long id, @RequestBody ResumeData resumeData) {
//        return resumeDataService.updateCandidate(id, resumeData);
//    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResumeData> updateCandidate(
            @PathVariable Long id,
            @ModelAttribute ResumeData resumeData,  // text fields
            @RequestPart(value = "resume", required = false) MultipartFile resumeFile // file
    ) {
        return resumeDataService.updateCandidate(id, resumeData, resumeFile);
    }



//    visual

    @GetMapping("/visuals")
    public List<UploadSummary> getResumeUploads(
            @RequestParam(defaultValue = "daily") String filter) {
        return resumeDataService.getUploads(filter);
    }



}
