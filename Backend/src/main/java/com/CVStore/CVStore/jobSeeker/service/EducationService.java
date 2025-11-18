package com.CVStore.CVStore.jobSeeker.service;

import com.CVStore.CVStore.jobSeeker.entity.Education;

import java.util.List;
import java.util.Optional;

public interface EducationService {

    Education saveEducation(Education education);
    List<Education> getAllEducation();
//    Education getEducationCandidate(Long id);
    Optional<Education> getEducation(Long id);
    Education updateEducation(Long id, Education updateEducation);
    void deleteEducation(Long id);
}
