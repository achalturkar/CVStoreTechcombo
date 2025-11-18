package com.CVStore.CVStore.jobSeeker.service.Implementation;

import com.CVStore.CVStore.jobSeeker.entity.Education;
import com.CVStore.CVStore.jobSeeker.repository.EducationRepository;
import com.CVStore.CVStore.jobSeeker.service.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class EducationServiceImpl implements EducationService {

    public final EducationRepository educationRepository;


    @Override
    public Education saveEducation(Education education) {
        return educationRepository.save(education);
    }

    @Override
    public List<Education> getAllEducation() {
        return educationRepository.findAll();
    }

//    @Override
//    public Education getEducationCandidate(Long id) {
//        return educationRepository.findB;
//    }

    @Override
    public Optional<Education> getEducation(Long id) {
        return educationRepository.findById(id);
    }

    @Override
    public Education updateEducation(Long id, Education updateEducation) {
        return educationRepository.findById(id)
                .map(existing -> {
                    existing.setDegree(updateEducation.getDegree());
                    existing.setUniversity(updateEducation.getUniversity());
                    existing.setFieldOfStudy(updateEducation.getFieldOfStudy());
                    existing.setPercentageOrCgpa(updateEducation.getPercentageOrCgpa());
                    existing.setStartYear(updateEducation.getStartYear());
                    existing.setEndYear(updateEducation.getEndYear());
                     return educationRepository.save(existing);
                }).orElseThrow(() -> new RuntimeException("PersonalInfo not found"));
    }

    @Override
    public void deleteEducation(Long id) {
        educationRepository.deleteById(id);

    }
}
