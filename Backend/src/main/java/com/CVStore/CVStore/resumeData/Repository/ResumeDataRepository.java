package com.CVStore.CVStore.resumeData.Repository;

import com.CVStore.CVStore.resumeData.Dto.UploadSummary;
import com.CVStore.CVStore.resumeData.Entity.ResumeData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ResumeDataRepository extends JpaRepository<ResumeData, Long>, JpaSpecificationExecutor<ResumeData> {

    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);

    List<ResumeData> findBySkills(String skills);

    List<ResumeData> findBySkillsContainingIgnoreCase(String skill);


    Optional<ResumeData> findByPhoneNumber(String phoneNumber);

    Optional<ResumeData> findByFullNameContainingIgnoreCase(String fullName);

//    Page<Candidate> allList(Pageable pageable);

    long countBySkillsContainingIgnoreCase(String skill);

    boolean existsByFileHash(String fileHash);

    boolean existsByEmailIgnoreCase(String email);



    @Query(value = "SELECT DATE(created_date) AS date, COUNT(*) AS count " +
            "FROM ResumeData GROUP BY DATE(created_date) ORDER BY date ASC",
            nativeQuery = true)
    List<UploadSummary> getDailyUploads();

    @Query(value = "SELECT DATE_TRUNC('week', created_date) AS date, COUNT(*) AS count " +
            "FROM ResumeData " +
            "GROUP BY DATE_TRUNC('week', created_date) " +
            "ORDER BY date ASC",
            nativeQuery = true)
    List<UploadSummary> getWeeklyUploads();

    // Monthly
    @Query(value = "SELECT DATE_TRUNC('month', created_date) AS date, COUNT(*) AS count " +
            "FROM ResumeData " +
            "GROUP BY DATE_TRUNC('month', created_date) " +
            "ORDER BY date ASC",
            nativeQuery = true)
    List<UploadSummary> getMonthlyUploads();



   //from main search
    @Query("SELECT c FROM ResumeData c " +
            "WHERE LOWER(c.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.skills) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.company) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.education) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.email) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.phoneNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<ResumeData> searchCandidates(@Param("keyword") String keyword, Pageable pageable);


    @Query("SELECT c FROM ResumeData c " +
            "WHERE LOWER(c.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.skills) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.company) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.education) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.email) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.phoneNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<ResumeData> searchCandidatesPage(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT c FROM ResumeData c " +
            "WHERE LOWER(c.fullName) LIKE LOWER(CONCAT('%', COALESCE(:fullName, ''), '%')) " +
            "AND LOWER(c.education) LIKE LOWER(CONCAT('%', COALESCE(:education, ''), '%')) " +
            "AND LOWER(c.skills) LIKE LOWER(CONCAT('%', COALESCE(:skills, ''), '%')) " +
            "AND LOWER(c.company) LIKE LOWER(CONCAT('%', COALESCE(:company, ''), '%')) " +
            "AND LOWER(c.experience) LIKE LOWER(CONCAT('%', COALESCE(:experience, ''), '%')) " +
            "AND LOWER(c.address) LIKE LOWER(CONCAT('%', COALESCE(:address, ''), '%'))")
    Page<ResumeData> searchWithFilters(
            @Param("fullName") String fullName,
            @Param("education") String education,
            @Param("skills") String skills,
            @Param("company") String company,
            @Param("experience") String experience,
            @Param("address") String address,
            Pageable pageable
    );



    //all in one



    @Query("SELECT c FROM ResumeData c " +
            "WHERE " +
            "(:keyword IS NULL OR :keyword = '' OR " +
            "   LOWER(c.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.skills) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.company) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.education) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.email) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.designation) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(c.phoneNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:fullName IS NULL OR :fullName = '' OR LOWER(c.fullName) LIKE LOWER(CONCAT('%', :fullName, '%'))) " +
            "AND (:education IS NULL OR :education = '' OR LOWER(c.education) LIKE LOWER(CONCAT('%', :education, '%'))) " +
            "AND (:skills IS NULL OR :skills = '' OR LOWER(c.skills) LIKE LOWER(CONCAT('%', :skills, '%'))) " +
            "AND (:company IS NULL OR :company = '' OR LOWER(c.company) LIKE LOWER(CONCAT('%', :company, '%'))) " +
            "AND (:experience IS NULL OR :experience = '' OR LOWER(c.experience) LIKE LOWER(CONCAT('%', :experience, '%'))) " +
            "AND (:designation IS NULL OR :designation = '' OR LOWER(c.designation) LIKE LOWER(CONCAT('%', :designation, '%'))) " +
            "AND (:address IS NULL OR :address = '' OR LOWER(c.address) LIKE LOWER(CONCAT('%', :address, '%')))")
    Page<ResumeData> searchResumeData(
            @Param("keyword") String keyword,
            @Param("fullName") String fullName,
            @Param("education") String education,
            @Param("skills") String skills,
            @Param("company") String company,
            @Param("experience") String experience,
            @Param("designation") String designation,
            @Param("address") String address,
            Pageable pageable
    );

}
