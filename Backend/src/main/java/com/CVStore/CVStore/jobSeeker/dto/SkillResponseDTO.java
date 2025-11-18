package com.CVStore.CVStore.jobSeeker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SkillResponseDTO {
    private Long id;
    private String skillName;
}