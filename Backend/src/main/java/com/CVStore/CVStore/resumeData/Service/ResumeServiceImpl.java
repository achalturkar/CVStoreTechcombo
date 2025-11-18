package com.CVStore.CVStore.resumeData.Service;

import com.CVStore.CVStore.resumeData.Dto.ResumeFilterRequest;
import com.CVStore.CVStore.resumeData.Entity.ResumeData;
import com.CVStore.CVStore.resumeData.Repository.ResumeDataRepository;
import com.CVStore.CVStore.resumeData.Specification.ResumeSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class ResumeServiceImpl implements ResumeService {

    @Autowired
    private ResumeDataRepository resumeDataRepository;

    @Override
    public Page<ResumeData> filterResumes(ResumeFilterRequest req, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Specification<ResumeData> spec = ResumeSpecification.filter(req);

        return resumeDataRepository.findAll(spec, pageable);
    }
}
