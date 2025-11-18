package com.CVStore.CVStore.jobSeeker.service;

import com.CVStore.CVStore.jobSeeker.entity.PersonalInfo;

import java.util.List;
import java.util.Optional;

public interface PersonalInfoService {
    PersonalInfo savePersonalInfo(PersonalInfo personalInfo);
    List<PersonalInfo> getAllPersonalInfo();
    Optional<PersonalInfo> getPersonalInfoById(Long id);
    PersonalInfo updatePersonalInfo(Long id, PersonalInfo updatedInfo);
    void deletePersonalInfo(Long id);

    PersonalInfo getByCandidateId(Long candidateId);
    PersonalInfo updateByCandidateId(Long candidateId, PersonalInfo updatedInfo);

    PersonalInfo createForCandidate(Long candidateId, PersonalInfo personalInfo);
}
