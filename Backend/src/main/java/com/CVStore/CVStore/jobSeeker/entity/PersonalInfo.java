package com.CVStore.CVStore.jobSeeker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonalInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String gender;

    private String address;
    private String resumeHeadline;
    private String profileType;

    private LocalDate dob;

    @OneToOne
    @JoinColumn(name = "candidate_id")
    @JsonIgnore
    private Candidate candidate;

}
