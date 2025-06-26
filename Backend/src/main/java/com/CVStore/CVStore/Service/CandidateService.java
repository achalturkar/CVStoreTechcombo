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
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
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

    public Optional<Candidate> getCandidateById(Long id) {
        return candidateRepository.findById(id);
    }

//    public ResponseEntity<?> getCandidateResponseById(Long id) {
//        Optional<Candidate> candidate = candidateRepository.findById(id);
//        return candidate.map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Candidate Not Found"));
//    }

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

    public ResponseEntity<?> deleteCandidate(long id) {
        candidateRepository.deleteById(id);
        return ResponseEntity.ok("Candidate deleted successfully");
    }

    public ResponseEntity<List<Candidate>> searchBySkills(String skills) {
        List<Candidate> candidates = candidateRepository.findBySkills(skills);
        return candidates.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(candidates);
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

    // Resume parsing
    public Map<String, String> parseResume(MultipartFile file, String uploadDir) throws IOException {
        String text = extractTextFromFile(file);
        Map<String, String> extractedData = new HashMap<>();
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get(uploadDir);
        Files.createDirectories(uploadPath);
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        extractedData.put("fullName", extractName(text));
        extractedData.put("email", extractEmail(text));
        extractedData.put("phoneNumber", extractPhone(text));
        extractedData.put("skills", extractSkills(text));
        extractedData.put("address", extractAddress(text));
        extractedData.put("experience", extractExperience(text));
        extractedData.put("filePath", filePath.toString());


        Candidate candidate = new Candidate();
        candidate.setFullName(extractedData.get("fullName"));
        candidate.setEmail(extractedData.get("email"));
        candidate.setPhoneNumber(extractedData.get("phoneNumber"));
        candidate.setSkills(extractedData.get("skills"));
        candidate.setAddress(extractedData.get("address"));
        candidate.setExperience(extractedData.get("experience"));
        candidate.setFilePath(filePath.toString());
        candidateRepository.save(candidate);
        return extractedData;
    }

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

    public String extractEmail(String text) {
        Matcher matcher = Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}").matcher(text);
        return matcher.find() ? matcher.group() : "Not found";
    }

    public String extractPhone(String text) {
        Matcher matcher = Pattern.compile("(\\+91[-\\s]?)?[6-9]\\d{9}").matcher(text);
        return matcher.find() ? matcher.group().replaceAll("\\D", "") : "Not found";
    }

    public String extractName(String text) {
        String[] lines = text.split("\\n");
        for (String line : lines) {
            if (line.matches("(?i)name[:\\s]*[A-Za-z\\s]{3,}")) {
                return line.replaceAll("(?i)name[:\\s]*", "").trim();
            }
        }
        return lines.length > 0 ? lines[0].trim() : "Not found";
    }

    public String extractSkills(String text) {
        String[] skills = {"Java", "Spring", "React", "Angular", "Python", "Node", "SQL", "AWS", "HTML", "CSS", "Team Leader"};
        return Arrays.stream(skills)
                .filter(skill -> text.toLowerCase().contains(skill.toLowerCase()))
                .collect(Collectors.joining(", "));
    }

    public String extractAddress(String text) {
        Matcher matcher = Pattern.compile("(?i)address[:\\s]*(.*)").matcher(text);
        return matcher.find() ? matcher.group(1).trim() : "Not found";
    }

    public String extractExperience(String text) {
        Matcher matcher = Pattern.compile("(\\d+\\+? years? of experience)", Pattern.CASE_INSENSITIVE).matcher(text);
        return matcher.find() ? matcher.group(1) : "Not found";
    }
}
