package com.CVStore.CVStore.jobSeeker.service.Implementation;


import com.CVStore.CVStore.jobSeeker.entity.Candidate;
import com.CVStore.CVStore.jobSeeker.entity.PersonalInfo;
import com.CVStore.CVStore.jobSeeker.repository.CandidateRepository;
import com.CVStore.CVStore.jobSeeker.repository.PersonalInfoRepository;
import com.CVStore.CVStore.jobSeeker.service.PersonalInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@RequiredArgsConstructor
@Service
public class PersonalInfoServiceImpl implements PersonalInfoService {

    private final PersonalInfoRepository personalInfoRepository;

    private  final CandidateRepository candidateRepository;



    @Override
    public PersonalInfo getByCandidateId(Long candidateId) {
        return personalInfoRepository.findByCandidateId(candidateId)
                .orElse(null);
    }

    @Override
    public PersonalInfo updateByCandidateId(Long candidateId, PersonalInfo updatedInfo) {
        PersonalInfo existing = personalInfoRepository.findByCandidateId(candidateId)
                .orElseThrow(() -> new RuntimeException("Personal info not found for candidate ID: " + candidateId));

        existing.setAddress(updatedInfo.getAddress());
        existing.setGender(updatedInfo.getGender());
        existing.setResumeHeadline(updatedInfo.getResumeHeadline());
        existing.setProfileType(updatedInfo.getProfileType());
        existing.setDob(updatedInfo.getDob());

        return  personalInfoRepository.save(existing);

    }



    @Override
    public PersonalInfo savePersonalInfo(PersonalInfo personalInfo) {
        return personalInfoRepository.save(personalInfo);
    }

    @Override
    public List<PersonalInfo> getAllPersonalInfo() {
        return personalInfoRepository.findAll();
    }

    @Override
    public Optional<PersonalInfo> getPersonalInfoById(Long id) {
        return personalInfoRepository.findById(id);
    }

    @Override
    public PersonalInfo updatePersonalInfo(Long id, PersonalInfo updatedInfo) {
        return personalInfoRepository.findById(id)
                .map(existing -> {
                    existing.setGender(updatedInfo.getGender());
                    existing.setAddress(updatedInfo.getAddress());
                    existing.setDob(updatedInfo.getDob());
                    existing.setResumeHeadline(updatedInfo.getResumeHeadline());
                    existing.setProfileType(updatedInfo.getProfileType());
                    return personalInfoRepository.save(existing);
                }).orElseThrow(() -> new RuntimeException("PersonalInfo not found"));
    }

    @Override
    public void deletePersonalInfo(Long id) {
        personalInfoRepository.deleteById(id);
    }

       public PersonalInfo createForCandidate(Long candidateId, PersonalInfo personalInfo) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found with ID: " + candidateId));
        personalInfo.setCandidate(candidate);
        return personalInfoRepository.save(personalInfo);
    }
}
