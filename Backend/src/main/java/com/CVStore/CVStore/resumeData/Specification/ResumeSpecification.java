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


            // ===========================================
            // 1. KEYWORD SEARCH (Best Performance)
            // ===========================================
            if (req.getKeyword() != null && !req.getKeyword().isBlank()) {

                String[] words = req.getKeyword().toLowerCase().split("\\s+");
                List<Predicate> keywordPredicates = new ArrayList<>();

                for (String w : words) {
                    String like = "%" + w + "%";

                    keywordPredicates.add(
                            cb.or(
                                    cb.like(cb.lower(root.get("fullName")), like),
                                    cb.like(cb.lower(root.get("skills")), like),
                                    cb.like(cb.lower(root.get("company")), like),
                                    cb.like(cb.lower(root.get("designation")), like),
                                    cb.like(cb.lower(root.get("education")), like),
                                    cb.like(cb.lower(root.get("address")), like),
                                    cb.like(cb.lower(root.get("email")), like),
                                    cb.like(cb.lower(root.get("experience")), like)
                            )
                    );
                }

                // ANY keyword match
                predicates.add(cb.or(keywordPredicates.toArray(new Predicate[0])));
            }


            // ===========================================
            // 2. EXPERIENCE (String field)
            // ===========================================
//            if (req.getExperience() != null && !req.getExperience().isBlank()) {
//                predicates.add(
//                        cb.like(
//                                cb.lower(root.get("experience")),
//                                "%" + req.getExperience().toLowerCase() + "%"
//                        )
//                );
//            }

            if (req.getExperience() != null) {
                predicates.add(
                        cb.like(
                                cb.lower(root.get("experience")),
                                "%" + req.getExperience().toString().toLowerCase() + "%"
                        )
                );
            }


            // ===========================================
            // 3. SKILLS MULTIPLE
            // ===========================================
            if (req.getSkills() != null && !req.getSkills().isEmpty()) {
                List<Predicate> skillPred = new ArrayList<>();
                for (String s : req.getSkills()) {
                    skillPred.add(cb.like(cb.lower(root.get("skills")), "%" + s.toLowerCase() + "%"));
                }
                predicates.add(cb.or(skillPred.toArray(new Predicate[0])));
            }


            // COMPANY
            if (req.getCompanies() != null && !req.getCompanies().isEmpty()) {
                List<Predicate> cList = new ArrayList<>();
                for (String c : req.getCompanies()) {
                    cList.add(cb.like(cb.lower(root.get("company")), "%" + c.toLowerCase() + "%"));
                }
                predicates.add(cb.or(cList.toArray(new Predicate[0])));
            }


            // DESIGNATION
            if (req.getDesignations() != null && !req.getDesignations().isEmpty()) {
                List<Predicate> list = new ArrayList<>();
                for (String d : req.getDesignations()) {
                    list.add(cb.like(cb.lower(root.get("designation")), "%" + d.toLowerCase() + "%"));
                }
                predicates.add(cb.or(list.toArray(new Predicate[0])));
            }


            // EDUCATION
            if (req.getEducations() != null && !req.getEducations().isEmpty()) {
                List<Predicate> list = new ArrayList<>();
                for (String e : req.getEducations()) {
                    list.add(cb.like(cb.lower(root.get("education")), "%" + e.toLowerCase() + "%"));
                }
                predicates.add(cb.or(list.toArray(new Predicate[0])));
            }


            // LOCATION
            if (req.getLocations() != null && !req.getLocations().isEmpty()) {
                List<Predicate> list = new ArrayList<>();
                for (String l : req.getLocations()) {
                    list.add(cb.like(cb.lower(root.get("address")), "%" + l.toLowerCase() + "%"));
                }
                predicates.add(cb.or(list.toArray(new Predicate[0])));
            }


            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}


//public class ResumeSpecification {
//
//    public static Specification<ResumeData> filter(ResumeFilterRequest req) {
//
//        return (root, query, cb) -> {
//
//            List<Predicate> predicates = new ArrayList<>();
//
//            // ===========================================
//            // 1. KEYWORD SEARCH (LIKE NAUKRI RESDEX)
//            // ===========================================
//            if (req.getKeyword() != null && !req.getKeyword().isBlank()) {
//
//                String[] words = req.getKeyword().toLowerCase().split("\\s+");
//                List<Predicate> multiWordPredicates = new ArrayList<>();
//
//                for (String w : words) {
//                    String likeWord = "%" + w + "%";
//
//                    multiWordPredicates.add(
//                            cb.or(
//                                    cb.like(cb.lower(root.get("fullName")), likeWord),
//                                    cb.like(cb.lower(root.get("skills")), likeWord),
//                                    cb.like(cb.lower(root.get("company")), likeWord),
//                                    cb.like(cb.lower(root.get("designation")), likeWord),
//                                    cb.like(cb.lower(root.get("education")), likeWord),
//                                    cb.like(cb.lower(root.get("address")), likeWord),
//                                    cb.like(cb.lower(root.get("experience")), likeWord),
//                                    cb.like(cb.lower(root.get("email")), likeWord)
//                            )
//                    );
//                }
//
//                predicates.add(cb.and(multiWordPredicates.toArray(new Predicate[0])));
//            }
//
//            // ===========================================
//            // 2. EXPERIENCE FILTER
//            // ===========================================
//            if (req.getExperience() != null) {
//                predicates.add(
//                        cb.like(
//                                cb.lower(root.get("experience")),
//                                "%" + req.getExperience().toString().toLowerCase() + "%"
//                        )
//                );
//            }
//
//            // ===========================================
//            // 3. SKILLS (MULTIPLE)
//            // ===========================================
//            if (req.getSkills() != null && !req.getSkills().isEmpty()) {
//                List<Predicate> skillPred = new ArrayList<>();
//                for (String s : req.getSkills()) {
//                    skillPred.add(
//                            cb.like(cb.lower(root.get("skills")), "%" + s.toLowerCase() + "%")
//                    );
//                }
//                predicates.add(cb.or(skillPred.toArray(new Predicate[0])));
//            }
//
//            // ===========================================
//            // 4. COMPANY
//            // ===========================================
//            if (req.getCompanies() != null && !req.getCompanies().isEmpty()) {
//                List<Predicate> list = new ArrayList<>();
//                for (String c : req.getCompanies()) {
//                    list.add(
//                            cb.like(cb.lower(root.get("company")), "%" + c.toLowerCase() + "%")
//                    );
//                }
//                predicates.add(cb.or(list.toArray(new Predicate[0])));
//            }
//
//            // ===========================================
//            // 5. DESIGNATION
//            // ===========================================
//            if (req.getDesignations() != null && !req.getDesignations().isEmpty()) {
//                List<Predicate> list = new ArrayList<>();
//                for (String d : req.getDesignations()) {
//                    list.add(
//                            cb.like(cb.lower(root.get("designation")), "%" + d.toLowerCase() + "%")
//                    );
//                }
//                predicates.add(cb.or(list.toArray(new Predicate[0])));
//            }
//
//            // ===========================================
//            // 6. EDUCATION
//            // ===========================================
//            if (req.getEducations() != null && !req.getEducations().isEmpty()) {
//                List<Predicate> list = new ArrayList<>();
//                for (String e : req.getEducations()) {
//                    list.add(
//                            cb.like(cb.lower(root.get("education")), "%" + e.toLowerCase() + "%")
//                    );
//                }
//                predicates.add(cb.or(list.toArray(new Predicate[0])));
//            }
//
//            // ===========================================
//            // 7. LOCATION
//            // ===========================================
//            if (req.getLocations() != null && !req.getLocations().isEmpty()) {
//                List<Predicate> list = new ArrayList<>();
//                for (String l : req.getLocations()) {
//                    list.add(
//                            cb.like(cb.lower(root.get("address")), "%" + l.toLowerCase() + "%")
//                    );
//                }
//                predicates.add(cb.or(list.toArray(new Predicate[0])));
//            }
//
//            return cb.and(predicates.toArray(new Predicate[0]));
//        };
//    }
//}
