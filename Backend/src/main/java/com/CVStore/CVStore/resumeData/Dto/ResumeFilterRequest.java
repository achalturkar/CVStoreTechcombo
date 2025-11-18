package com.CVStore.CVStore.resumeData.Dto;

import lombok.Data;

import java.util.List;

@Data
public class ResumeFilterRequest {

    private String keyword;

    private List<String> skills;
    private List<String> companies;
    private List<String> designations;
    private List<String> educations;
    private List<String> locations;

    private Integer experience;
}
