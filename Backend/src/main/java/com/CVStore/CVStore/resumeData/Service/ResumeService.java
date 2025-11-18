package com.CVStore.CVStore.resumeData.Service;


import com.CVStore.CVStore.resumeData.Dto.ResumeFilterRequest;
import com.CVStore.CVStore.resumeData.Entity.ResumeData;
import org.springframework.data.domain.Page;

public interface ResumeService {
    Page<ResumeData> filterResumes(ResumeFilterRequest req, int page, int size);

}