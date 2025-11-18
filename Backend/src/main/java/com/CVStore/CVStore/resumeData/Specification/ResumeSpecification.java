package com.CVStore.CVStore.resumeData.Specification;

import com.CVStore.CVStore.resumeData.Dto.ResumeFilterRequest;
import com.CVStore.CVStore.resumeData.Entity.ResumeData;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ResumeSpecification {

    public static Specification<ResumeData> filter(ResumeFilterRequest req) {

        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            // -----------------------------------------
            // MULTI-WORD KEYWORD SEARCH  (Resdex Style)
            // -----------------------------------------
            if (req.getKeyword() != null && !req.getKeyword().isEmpty()) {

                String[] words = req.getKeyword().toLowerCase().split("\\s+");

                List<Predicate> multiWordPredicates = new ArrayList<>();

                for (String word : words) {

                    String likeWord = "%" + word + "%";

                    multiWordPredicates.add(
                            cb.or(
                                    cb.like(cb.lower(root.get("fullName")), likeWord),
                                    cb.like(cb.lower(root.get("skills")), likeWord),
                                    cb.like(cb.lower(root.get("company")), likeWord),
                                    cb.like(cb.lower(root.get("designation")), likeWord),
                                    cb.like(cb.lower(root.get("education")), likeWord),
                                    cb.like(cb.lower(root.get("address")), likeWord),
                                    cb.like(cb.lower(root.get("experience")), likeWord),
                                    cb.like(cb.lower(root.get("email")), likeWord)
                            )
                    );
                }

                // AND → all keywords must match
                predicates.add(cb.and(multiWordPredicates.toArray(new Predicate[0])));
            }

            // -----------------------------------------
            // SKILLS FILTER (MULTI)
            // -----------------------------------------
            if (req.getSkills() != null && !req.getSkills().isEmpty()) {
                List<Predicate> skillPredicates = new ArrayList<>();

                for (String skill : req.getSkills()) {
                    skillPredicates.add(
                            cb.like(cb.lower(root.get("skills")), "%" + skill.toLowerCase() + "%")
                    );
                }

                predicates.add(cb.or(skillPredicates.toArray(new Predicate[0])));
            }

            // -----------------------------------------
            // COMPANY FILTER (LIKE)
            // -----------------------------------------
            if (req.getCompanies() != null && !req.getCompanies().isEmpty()) {
                List<Predicate> companyPredicates = new ArrayList<>();

                for (String c : req.getCompanies()) {
                    companyPredicates.add(
                            cb.like(cb.lower(root.get("company")), "%" + c.toLowerCase() + "%")
                    );
                }

                predicates.add(cb.or(companyPredicates.toArray(new Predicate[0])));
            }

            // -----------------------------------------
            // DESIGNATION FILTER (LIKE)
            // -----------------------------------------
            if (req.getDesignations() != null && !req.getDesignations().isEmpty()) {
                List<Predicate> designationPredicates = new ArrayList<>();

                for (String d : req.getDesignations()) {
                    designationPredicates.add(
                            cb.like(cb.lower(root.get("designation")), "%" + d.toLowerCase() + "%")
                    );
                }

                predicates.add(cb.or(designationPredicates.toArray(new Predicate[0])));
            }

            // -----------------------------------------
            // EDUCATION FILTER (LIKE)
            // -----------------------------------------
            if (req.getEducations() != null && !req.getEducations().isEmpty()) {
                List<Predicate> educationPredicates = new ArrayList<>();

                for (String e : req.getEducations()) {
                    educationPredicates.add(
                            cb.like(cb.lower(root.get("education")), "%" + e.toLowerCase() + "%")
                    );
                }

                predicates.add(cb.or(educationPredicates.toArray(new Predicate[0])));
            }

            // -----------------------------------------
            // LOCATION FILTER (LIKE)
            // -----------------------------------------
            if (req.getLocations() != null && !req.getLocations().isEmpty()) {
                List<Predicate> locationPredicates = new ArrayList<>();

                for (String l : req.getLocations()) {
                    locationPredicates.add(
                            cb.like(cb.lower(root.get("address")), "%" + l.toLowerCase() + "%")
                    );
                }

                predicates.add(cb.or(locationPredicates.toArray(new Predicate[0])));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
