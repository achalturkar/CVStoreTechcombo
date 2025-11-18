package com.CVStore.CVStore.jobSeeker.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fieldOfStudy;
    private String degree;
    private String university;
    private String startYear;
    private String endYear;
    private Double percentageOrCgpa;

    @ManyToOne
    @JoinColumn(name="candidate_id")
    private Candidate candidate;
}
