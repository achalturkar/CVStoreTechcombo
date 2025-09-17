package com.CVStore.CVStore.Service;

import com.CVStore.CVStore.Entity.Candidate;
import com.CVStore.CVStore.Repository.CandidateRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class CandidateService {

    @Autowired
    public CandidateRepository candidateRepository;

    // Upload Candidate and Save
    public ResponseEntity<?> saveCandidate(MultipartFile file, String fullName, String phoneNumber, String email,
                                           String experience, String address, String skills, String uploadDir) {
        try {
            String fileName =  file.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);
            Files.createDirectories(uploadPath);
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            Candidate candidate = new Candidate();
            candidate.setFullName(fullName);
            candidate.setEmail(email);
            candidate.setPhoneNumber(phoneNumber);
            candidate.setExperience(experience);
            candidate.setAddress(address);
            candidate.setSkills(skills);
            candidate.setFilePath(filePath.toString());

            candidateRepository.save(candidate);
            return ResponseEntity.ok("Candidate Detail uploaded successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public Page<Candidate> recent(Pageable pageable) {
        return candidateRepository.findAll(pageable);
    }


    public Optional<Candidate> getCandidateById(Long id) {
        return candidateRepository.findById(id);
    }

    public ResponseEntity<Resource> downloadCV(Long id) {
        try {
            Optional<Candidate> optional = candidateRepository.findById(id);
            if (optional.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

            Path filePath = Paths.get(optional.get().getFilePath());
            if (!Files.exists(filePath)) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

            Resource resource = new UrlResource(filePath.toUri());
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filePath.getFileName() + "\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public void deleteCandidate(long id) {
        Candidate candidate = candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        // Delete resume file from folder
        if (candidate.getFilePath() != null) {
            File file = new File(candidate.getFilePath());
            if (file.exists()) {
                file.delete();
            }
        }

        // Delete candidate record from DB
        candidateRepository.delete(candidate);
    }


    public ResponseEntity<List<Candidate>> searchBySkills(String skills) {
        List<Candidate> candidates = candidateRepository.findBySkills(skills);
        return candidates.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(candidates);
    }


    public List<Candidate> searchCandidatesBySkill(String keyword) {
        return candidateRepository.findBySkillsContainingIgnoreCase(keyword);
    }

    public Optional<Candidate> searchCandidatesByFullName(String fullName) {
        return candidateRepository.findByFullNameContainingIgnoreCase(fullName);
    }

    public List<Candidate> searchCandidates(Long id, String fullName,  String skills) {
        return candidateRepository.searchByFilters(id, fullName,  skills);
    }

    public List<Candidate> filterCandidates(String fullName, String phoneNumber, String skills, String address, String email) {
        List<Candidate> allCandidates = candidateRepository.findAll();

        return allCandidates.stream()
                .filter(c -> (fullName == null || c.getFullName().toLowerCase().contains(fullName.toLowerCase())))
                .filter(c -> (phoneNumber == null || c.getPhoneNumber().contains(phoneNumber)))
                .filter(c -> (skills == null || c.getSkills().toLowerCase().contains(skills.toLowerCase())))
                .filter(c -> (address == null || c.getAddress().toLowerCase().contains(address.toLowerCase())))
                .filter(c -> (email == null || c.getEmail().toLowerCase().contains(email.toLowerCase())))
                .collect(Collectors.toList());
    }

    public Candidate getCandidate(Long id){
        return candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found with ID: " + id));

    }

    public ResponseEntity<Candidate> updateCandidate(Long id, Candidate updated){
        Optional<Candidate> optional = candidateRepository.findById(id);
        if (optional.isEmpty()) return ResponseEntity.notFound().build();

        Candidate existing = optional.get();
        existing.setFullName(updated.getFullName());
        existing.setEmail(updated.getEmail());
        existing.setPhoneNumber(updated.getPhoneNumber());
        existing.setExperience(updated.getExperience());
        existing.setSkills(updated.getSkills());
        existing.setAddress(updated.getAddress());
        existing.setFilePath(updated.getFilePath());

        return ResponseEntity.ok(candidateRepository.save(existing));
    }

    public long countBySkills(String skill){
        return candidateRepository.countBySkillsContainingIgnoreCase(skill);
    }


    //Resume Parsing
//    public List<Map<String, String>> parseMultipleResumes(MultipartFile[] files, String uploadDir) {
//        List<Map<String, String>> allExtractedData = new ArrayList<>();
//        List<Candidate> candidates = new ArrayList<>();
//
//        for (MultipartFile file : files) {
//            try {
//                // 1. Parse each resume
//                String text = extractTextFromFile(file);
//                Map<String, String> extractedData = new HashMap<>();
//
//                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
//                Path uploadPath = Paths.get(uploadDir);
//                Files.createDirectories(uploadPath);
//
//                Path filePath = uploadPath.resolve(fileName);
//                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//
//                extractedData.put("fullName", extractName(text));
//                extractedData.put("email", extractEmail(text));
//                extractedData.put("phoneNumber", extractPhone(text));
//                extractedData.put("skills", extractSkills(text));
//                extractedData.put("address", extractAddress(text));
//                extractedData.put("experience", extractExperience(text));
//                extractedData.put("filePath", filePath.toString());
//
//                allExtractedData.add(extractedData);
//
//                // 2. Create Candidate object
//                Candidate candidate = new Candidate();
//                candidate.setFullName(extractedData.get("fullName"));
//                candidate.setEmail(extractedData.get("email"));
//                candidate.setPhoneNumber(extractedData.get("phoneNumber"));
//                candidate.setSkills(extractedData.get("skills"));
//                candidate.setAddress(extractedData.get("address"));
//                candidate.setExperience(extractedData.get("experience"));
//                candidate.setFilePath(filePath.toString());
//
//                candidates.add(candidate);
//
//            } catch (Exception e) {
//                // If one file fails, add error info instead of stopping whole process
//                Map<String, String> errorData = new HashMap<>();
//                errorData.put("fileName", file.getOriginalFilename());
//                errorData.put("error", e.getMessage());
//                allExtractedData.add(errorData);
//            }
//        }
//
//        // 3. Save all candidates at once (bulk insert)
//        if (!candidates.isEmpty()) {
//            candidateRepository.saveAll(candidates);
//        }
//
//        return allExtractedData;
//    }


    public List<Map<String, String>> parseMultipleResumes(MultipartFile[] files, String uploadDir) {
        List<Map<String, String>> allExtractedData = new ArrayList<>();
        List<Candidate> candidatesToSave = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                // 1. Extract text
                String text = extractTextFromFile(file);

                // 2. Extract important fields
                String email = extractEmail(text);
                String phone = extractPhone(text);

                // 3. Check for duplicates
                if ((email != null && candidateRepository.existsByEmail(email)) ||
                        (phone != null && candidateRepository.existsByPhoneNumber(phone))) {

                    Map<String, String> duplicateData = new HashMap<>();
                    duplicateData.put("fileName", file.getOriginalFilename());
                    duplicateData.put("email", email != null ? email : "N/A");
                    duplicateData.put("phoneNumber", phone != null ? phone : "N/A");
                    duplicateData.put("status", "duplicate");
                    duplicateData.put("message", "Candidate already exists in database");
                    allExtractedData.add(duplicateData);

                    continue; // Skip saving this candidate
                }

                // 4. Save file on disk
                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path uploadPath = Paths.get(uploadDir);
                Files.createDirectories(uploadPath);

                Path filePath = uploadPath.resolve(fileName);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                // 5. Prepare extracted data map
                Map<String, String> extractedData = new HashMap<>();
                extractedData.put("fullName", extractName(text));
                extractedData.put("email", email);
                extractedData.put("phoneNumber", phone);
                extractedData.put("skills", extractSkills(text));
                extractedData.put("address", extractAddress(text));
                extractedData.put("experience", extractExperience(text));
                extractedData.put("company", extractCompany(text));
                extractedData.put("education", extractEducation(text));
                extractedData.put("filePath", filePath.toString());
                extractedData.put("status", "saved");
                allExtractedData.add(extractedData);

                // 6. Create Candidate entity
                Candidate candidate = new Candidate();
                candidate.setFullName(extractedData.get("fullName"));
                candidate.setEmail(email);
                candidate.setPhoneNumber(phone);
                candidate.setSkills(extractedData.get("skills"));
                candidate.setAddress(extractedData.get("address"));
                candidate.setExperience(extractedData.get("experience"));
                candidate.setCompany(extractedData.get("company"));
                candidate.setEducation(extractedData.get("education"));
                candidate.setFilePath(filePath.toString());

                candidatesToSave.add(candidate);

            } catch (Exception e) {
                // Error while parsing one file → log it but continue
                Map<String, String> errorData = new HashMap<>();
                errorData.put("fileName", file.getOriginalFilename());
                errorData.put("error", e.getMessage());
                errorData.put("status", "error");
                allExtractedData.add(errorData);
            }
        }

        // 7. Bulk save only new candidates
        if (!candidatesToSave.isEmpty()) {
            candidateRepository.saveAll(candidatesToSave);
        }

        return allExtractedData;
    }


    //Parsing Logic

    public String extractTextFromFile(MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename();
        if (filename.endsWith(".pdf")) {
            try (PDDocument document = PDDocument.load(file.getInputStream())) {
                return new PDFTextStripper().getText(document);
            }
        } else if (filename.endsWith(".docx")) {
            try (XWPFDocument document = new XWPFDocument(file.getInputStream());
                 XWPFWordExtractor extractor = new XWPFWordExtractor(document)) {
                return extractor.getText();
            }
        } else {
            throw new IllegalArgumentException("Unsupported file type.");
        }
    }

//    public String extractEmail(String text) {
//        Matcher matcher = Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}").matcher(text);
//        return matcher.find() ? matcher.group() :  UUID.randomUUID()+ "n";
//    }
//
//    public String extractPhone(String text) {
//        Matcher matcher = Pattern.compile("(\\+91[-\\s]?)?[6-9]\\d{9}").matcher(text);
//        return matcher.find() ? matcher.group().replaceAll("\\D", "") : "Not found";
//    }
//
//    public String extractName(String text) {
//        String[] lines = text.split("\\n");
//        for (String line : lines) {
//            if (line.matches("(?i)name[:\\s]*[A-Za-z\\s]{3,}")) {
//                return line.replaceAll("(?i)name[:\\s]*", "").trim();
//            }
//        }
//        return lines.length > 0 ? lines[0].trim() : "Not found";
//    }
//
//
//    public String extractSkills(String text) throws IOException {
//        List<String> skills = Files.readAllLines(Paths.get("src/main/resources/skills.txt"));
//
//        return skills.stream()
//                .filter(skill -> text.toLowerCase().contains(skill.toLowerCase()))
//                .collect(Collectors.joining(", "));
//    }
//
//
//    public String extractAddress(String text) throws IOException {
//        Matcher matcher = Pattern.compile("(?i)address[:\\s]*(.*)").matcher(text);
//        return matcher.find() ? matcher.group(1).trim() : "Not found";
//
//
//    }
//
//    public String extractExperience(String text) {
//        Matcher matcher = Pattern.compile("(\\d+\\+? years? of )", Pattern.CASE_INSENSITIVE).matcher(text);
//        return matcher.find() ? matcher.group(1) : "Not found";
//    }



        // -------- EMAIL --------
        public String extractEmail(String text) {
            Matcher matcher = Pattern.compile(
                    "(?i)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,})"
            ).matcher(text);

            return matcher.find() ? matcher.group(1).trim() : "";  // return blank if not found
        }

        // -------- PHONE (Indian + International) --------
        public String extractPhone(String text) {
            // Covers Indian (10-digit, +91, 91-) and international (+xx, +xxx formats with spaces, dashes, brackets)
            String phoneRegex =
                    "(?:(?:\\+?\\d{1,4}[\\s-]?)?" +        // Country code like +91, +1, +44
                            "(?:\\(?\\d{2,4}\\)?[\\s-]?)?" +      // Area code like (022), (020)
                            "\\d{3,4}[\\s-]?\\d{3,4})";

            Matcher matcher = Pattern.compile(phoneRegex).matcher(text);

            if (matcher.find()) {
                String phone = matcher.group().replaceAll("[^0-9+]", ""); // keep only digits and +
                return phone;
            }
            return ""; // blank if not found
        }

        // -------- NAME --------
        public String extractName(String text) {
            String[] lines = text.split("\\n");
            for (String line : lines) {
                if (line.matches("(?i)name[:\\s]*[A-Za-z\\s]{3,}")) {
                    return line.replaceAll("(?i)name[:\\s]*", "").trim();
                }
            }
            return lines.length > 0 ? lines[0].trim() : "";
        }

        // -------- SKILLS --------
        public String extractSkills(String text) throws IOException {
            List<String> skills = Files.readAllLines(Paths.get("src/main/resources/skills.txt"));

            return skills.stream()
                    .filter(skill -> text.toLowerCase().contains(skill.toLowerCase()))
                    .collect(Collectors.joining(", "));
        }

        // -------- ADDRESS --------
        public String extractAddress(String text) {
            Matcher matcher = Pattern.compile("(?i)address[:\\s]*(.*)").matcher(text);
            return matcher.find() ? matcher.group(1).trim() : "";
        }

        // -------- EXPERIENCE --------
        public String extractExperience(String text) {
            // More flexible pattern: e.g. "2 years", "3+ yrs", "10 yrs of exp", "Experience: 5 years"
            String expRegex = "(\\d+\\+?\\s*(years?|yrs?)(\\s*of\\s*exp(erience)?)?)";
            Matcher matcher = Pattern.compile(expRegex, Pattern.CASE_INSENSITIVE).matcher(text);

            return matcher.find() ? matcher.group(1).trim() : "";
        }


    public String extractEducation(String text) throws IOException {
        List<String> courses = Files.readAllLines(Paths.get("src/main/resources/education.txt"));
        return courses.stream()
                .filter(course -> text.toLowerCase().contains(course.toLowerCase()))
                .collect(Collectors.joining(", "));
    }

    public String extractCompany(String text) throws IOException {
        List<String> companies = Files.readAllLines(Paths.get("src/main/resources/company.txt"));
        return companies.stream()
                .filter(company -> text.toLowerCase().contains(company.toLowerCase()))
                .collect(Collectors.joining(", "));
    }



}
