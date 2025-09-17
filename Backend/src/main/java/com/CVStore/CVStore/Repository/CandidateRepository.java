package com.CVStore.CVStore.Repository;

import com.CVStore.CVStore.Entity.Candidate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);

    List<Candidate> findBySkills(String skills);

    List<Candidate> findBySkillsContainingIgnoreCase(String skill);


    Optional<Candidate> findByPhoneNumber(String phoneNumber);

    Optional<Candidate> findByFullNameContainingIgnoreCase(String fullName);

    List<Candidate> findAll();

//    Page<Candidate> allList(Pageable pageable);

    long countBySkillsContainingIgnoreCase(String skill);




    @Query("SELECT c FROM Candidate c WHERE " +
            "(:id IS NULL OR c.id = :id) AND " +
            "(:fullName IS NULL OR LOWER(c.fullName) LIKE LOWER(CONCAT('%', :fullName, '%'))) AND " +
            "(:skills IS NULL OR LOWER(c.skills) LIKE LOWER(CONCAT('%', :skills, '%')))")
    List<Candidate> searchByFilters(
            @Param("id") Long id,
            @Param("fullName") String fullName,
            @Param("skills") String skills
    );




}
