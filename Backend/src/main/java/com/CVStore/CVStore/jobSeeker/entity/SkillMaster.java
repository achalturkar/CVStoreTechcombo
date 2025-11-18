package com.CVStore.CVStore.jobSeeker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skills_master")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String skillName;

    private String category;
    private String subCategory;

    @ElementCollection
    private List<String> aliases = new ArrayList<>();

    private Boolean isActive = true;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();


    @OneToMany(mappedBy = "skill", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CandidateSkill> candidateSkills = new ArrayList<>();

    // Custom constructor for creating new skills easily
    public SkillMaster(String skillName) {
        this.skillName = skillName;
    }

}

