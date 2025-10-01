package com.CVStore.CVStore.Service;

import com.CVStore.CVStore.Dto.UploadSummary;
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
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
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

    //------service logic for Gwtmapping-------------

    public List<Candidate> getAllCandidates(Sort sort) {
        return candidateRepository.findAll(sort);
    }

    public Page<Candidate> recent(Pageable pageable) {
        return candidateRepository.findAll(pageable);
    }


    public Optional<Candidate> getCandidateById(Long id) {
        return candidateRepository.findById(id);
    }


    //-----------download logic----------------

    public ResponseEntity<Resource> downloadCV(Long id) {
        try {
            Optional<Candidate> optional = candidateRepository.findById(id);
            if (optional.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

            Path filePath = Paths.get(optional.get().getFilePath());
            if (!Files.exists(filePath)) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

            Resource resource = new UrlResource(filePath.toUri());

            // Detect content type based on file extension
            String fileName = filePath.getFileName().toString().toLowerCase();
            MediaType contentType = MediaType.APPLICATION_OCTET_STREAM; // default fallback

            if (fileName.endsWith(".pdf")) {
                contentType = MediaType.APPLICATION_PDF;
            } else if (fileName.endsWith(".docx")) {
                contentType = MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                );
            } else if (fileName.endsWith(".doc")) {
                contentType = MediaType.parseMediaType("application/msword");
            }

            return ResponseEntity.ok()
                    .contentType(contentType)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filePath.getFileName() + "\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //------------- Delete candidate record from DB-------------

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
        candidateRepository.delete(candidate);
    }





    public Optional<Candidate> searchCandidatesByFullName(String fullName) {
        return candidateRepository.findByFullNameContainingIgnoreCase(fullName);
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


    //-----------update candidate logic PUT Mapping-----------------

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



// -----------Parsing Multiple file Using Loop---------

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

                // ⚡ Skip if email is null/empty
                if (email == null || email.trim().isEmpty()) {
                    Map<String, String> errorData = new HashMap<>();
                    errorData.put("fileName", file.getOriginalFilename());
                    errorData.put("status", "skipped");
                    errorData.put("message", "No valid email found in resume");
                    allExtractedData.add(errorData);
                    continue;
                }

                // 3. Check for duplicates (DB + current batch)
                boolean alreadyExistsInDb =
                        candidateRepository.existsByEmail(email) ||
                                (phone != null && candidateRepository.existsByPhoneNumber(phone));

                boolean alreadyExistsInBatch =
                        candidatesToSave.stream().anyMatch(c -> c.getEmail().equalsIgnoreCase(email));

                if (alreadyExistsInDb || alreadyExistsInBatch) {
                    Map<String, String> duplicateData = new HashMap<>();
                    duplicateData.put("fileName", file.getOriginalFilename());
                    duplicateData.put("email", email);
                    duplicateData.put("phoneNumber", phone != null ? phone : "N/A");
                    duplicateData.put("status", "duplicate");
                    duplicateData.put("message", "Candidate already exists (duplicate)");
                    allExtractedData.add(duplicateData);
                    continue;
                }

                // 4. Save file on disk
                String fileName = file.getOriginalFilename();
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
                extractedData.put("designation", extractDesignation(text));
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
                candidate.setDesignation(extractedData.get("designation"));
                candidate.setEducation(extractedData.get("education"));
                candidate.setFilePath(filePath.toString());

                candidatesToSave.add(candidate);

            } catch (Exception e) {
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


    //---------------Parsing Logic  Regex Logic-------------------


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


        // -------- EMAIL --------
        public String extractEmail(String text) {
            Matcher matcher = Pattern.compile(
                    "(?i)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,})"
            ).matcher(text);

            return matcher.find() ? matcher.group(1).trim() : "";  // return blank if not found
        }

        // -------- PHONE (Indian + International) --------
//        public String extractPhone(String text) {
//            if (text == null || text.isEmpty()) return "";
//
//            // Replace non-breaking spaces and weird characters
//            text = text.replace('\u00A0', ' ');
//
//            // Regex: optional country code, digits, spaces/dashes/brackets allowed
//            Pattern pattern = Pattern.compile(
//                    "(\\+\\d{1,3}[\\s\\-]?)?" +   // optional country code (+1, +91 etc.)
//                            "(?:\\d[\\d\\s\\-()]{8,}\\d)" // main number, 10+ digits with optional separators
//            );
//
//            Matcher matcher = pattern.matcher(text);
//
//            while (matcher.find()) {
//                String match = matcher.group().trim();
//
//                // Normalize multiple spaces (max 1)
//                match = match.replaceAll("\\s{2,}", " ");
//
//                // Keep only digits and optional leading +
//                String digitsOnly = match.replaceAll("[^\\d+]", "");
//
//                // Validate length (minimum 10 digits for local number)
//                String cleanedNumber = digitsOnly;
//                if (digitsOnly.startsWith("+")) {
//                    // Keep country code + number
//                    cleanedNumber = digitsOnly;
//                } else if (digitsOnly.length() >= 10) {
//                    // Fallback to last 10 digits
//                    cleanedNumber = digitsOnly.substring(digitsOnly.length() - 10);
//                } else {
//                    continue; // too short, skip
//                }
//
//                return cleanedNumber;
//            }
//
//            return ""; // no valid phone found
//        }

    public static String extractPhone(String text) {
        // 1. Initial check for empty or null input.
        if (text == null || text.trim().isEmpty()) {
            return null;
        }

        // 2. Define a regex to find potential phone number candidates.
        // This pattern looks for sequences of 10 to 17 characters that can include digits,
        // an optional leading '+', spaces, hyphens, and parentheses.
        // It's designed to be broad enough to catch various formats.
        final Pattern potentialPhonePattern = Pattern.compile(
                "(?:\\+?\\d[\\d\\s()-]{8,15}\\d)"
        );

        Matcher matcher = potentialPhonePattern.matcher(text);

        // 3. Loop through all found candidates and validate them.
        while (matcher.find()) {
            String potentialMatch = matcher.group();

            // 4. Clean the candidate string.
            // Remove common separators like spaces, hyphens, and parentheses.
            // This leaves only digits and the '+' sign.
            String cleanedNumber = potentialMatch.replaceAll("[\\s()-]", "");

            // 5. Validate the cleaned number based on common patterns.
            // This is the most important step to eliminate false positives.

            // Case A: International Number
            if (cleanedNumber.startsWith("+")) {
                // A valid international number usually has between 11 and 15 digits (including country code).
                // e.g., +919876543210 has a length of 13.
                if (cleanedNumber.length() >= 11 && cleanedNumber.length() <= 15) {
                    return cleanedNumber; // Found a valid international number.
                }
            }
            // Case B: Local Number
            else {
                // A standard local number (like in India or the US) has 10 digits.
                // Your previous false positive "2320192017" has 16 digits, so it would fail this check.
                if (cleanedNumber.length() == 10) {
                    return cleanedNumber; // Found a valid 10-digit local number.
                }
            }
        }

        // 6. If the loop finishes without finding any valid number, return null.
        return null;
    }




    // -------- NAME --------
    public String extractName(String text) {
        String[] lines = text.split("\\n");
        for (String line : lines) {
            // Looks for a line starting with "Name:", case-insensitive
            if (line.matches("(?i)name[:\\s]*[A-Za-z\\s]{3,}")) {
                // Removes the "Name:" part and returns the rest
                return line.replaceAll("(?i)name[:\\s]*", "").trim();
            }
        }
        // If no line with "Name:" is found, it just returns the first line of the file.
        return lines.length > 0 ? lines[0].trim() : "";
    }

        // -------- SKILLS --------
        public String extractSkills(String text) throws IOException {

//            List<String> skills = Files.readAllLines(Paths.get("src/main/resources/skills.txt"));

//            return skills.stream()
//                    .filter(skill -> text.toLowerCase().contains(skill.toLowerCase()))
//                    .collect(Collectors.joining(", "));


            try (InputStream is = getClass().getClassLoader().getResourceAsStream("skills.txt");
                 BufferedReader reader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))) {

                List<String> skills = reader.lines().collect(Collectors.toList());

                // ... rest of your stream logic
                return skills.stream()
                        .filter(skill -> text.toLowerCase().contains(skill.toLowerCase()))
                        .collect(Collectors.joining(", "));

            } catch (IOException e) {
                // Handle the exception or re-throw as an unchecked exception if appropriate
                throw new IOException("Error reading skills.txt from classpath.", e);
            }
        }

    // -------- Designation --------
    public String extractDesignation(String text) throws IOException {

        try (InputStream is = getClass().getClassLoader().getResourceAsStream("designation.txt");
             BufferedReader reader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))) {

            List<String> designation = reader.lines().collect(Collectors.toList());

            // ... rest of your stream logic
            return designation.stream()
                    .filter(design -> text.toLowerCase().contains(design.toLowerCase()))
                    .collect(Collectors.joining(", "));

        } catch (IOException e) {
            // Handle the exception or re-throw as an unchecked exception if appropriate
            throw new IOException("Error reading designation.txt from classpath.", e);
        }


    }

        // -------- ADDRESS --------
//        public String extractAddress(String text) {
//            Matcher matcher = Pattern.compile("(?i)address[:\\s]*(.*)").matcher(text);
//            return matcher.find() ? matcher.group(1).trim() : "";
//        }

    private static final Pattern PIN_CODE_PATTERN = Pattern.compile("\\b(\\d{6})\\b");

    private static final Set<String> MAJOR_CITIES = new HashSet<>(Arrays.asList(
            "nagpur", "mumbai", "delhi", "pune", "bengaluru", "bangalore",
            "chennai", "kolkata", "hyderabad", "chandrapur", "ahmedabad", "bhandara"
    ));
    public static String extractAddress(String text) {
        if (text == null || text.trim().isEmpty()) {
            return null;
        }

        String[] lines = text.split("\\r?\\n");

        // Scan through each line of the resume
        for (String line : lines) {
            Matcher pinMatcher = PIN_CODE_PATTERN.matcher(line);

            // Does this line contain a 6-digit PIN code?
            if (pinMatcher.find()) {
                String addressCandidate = line.trim();

                boolean cityFound = false;
                for (String city : MAJOR_CITIES) {
                    // Check for the city name, case-insensitive
                    if (addressCandidate.toLowerCase().contains(city)) {
                        cityFound = true;
                        break;
                    }
                }

                if (cityFound) {
                    if (addressCandidate.length() <= 150) { // A bit more flexible than 100
                        return addressCandidate;
                    }
                }
            }
        }

        // If no line with a PIN code and a city was found, return null.
        return null;
    }


    // -------- EXPERIENCE --------
        public String extractExperience(String text) {
            // More flexible pattern: e.g. "2 years", "3+ yrs", "10 yrs of exp", "Experience: 5 years"
            String expRegex = "(\\d+\\+?\\s*(years?|yrs?)(\\s*of\\s*exp(erience)?)?)";
            Matcher matcher = Pattern.compile(expRegex, Pattern.CASE_INSENSITIVE).matcher(text);

            return matcher.find() ? matcher.group(1).trim() : "";
        }


    public String extractEducation(String text) throws IOException {

        try (InputStream is = getClass().getClassLoader().getResourceAsStream("education.txt");
             BufferedReader reader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))) {

            List<String> education = reader.lines().collect(Collectors.toList());

            // ... rest of your stream logic
            return education.stream()
                    .filter(edu -> text.toLowerCase().contains(edu.toLowerCase()))
                    .collect(Collectors.joining(", "));

        } catch (IOException e) {
            // Handle the exception or re-throw as an unchecked exception if appropriate
            throw new IOException("Error reading education.txt from classpath.", e);
        }

    }

    public String extractCompany(String text) throws IOException {
        try (InputStream is = getClass().getClassLoader().getResourceAsStream("company.txt");
             BufferedReader reader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))) {

            List<String> companies = reader.lines().collect(Collectors.toList());

            // ... rest of your stream logic
            return companies.stream()
                    .filter(comp -> text.toLowerCase().contains(comp.toLowerCase()))
                    .collect(Collectors.joining(", "));

        } catch (IOException e) {
            // Handle the exception or re-throw as an unchecked exception if appropriate
            throw new IOException("Error reading company.txt from classpath.", e);
        }
    }



    //visuals

    public List<UploadSummary> getUploads(String filter) {
        switch (filter.toLowerCase()) {
            case "weekly":
                return candidateRepository.getWeeklyUploads();
            case "monthly":
                return candidateRepository.getMonthlyUploads();
            default:
                return candidateRepository.getDailyUploads();
        }
    }



}
