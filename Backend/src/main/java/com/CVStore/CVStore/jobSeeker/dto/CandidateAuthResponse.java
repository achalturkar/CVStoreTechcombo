package com.CVStore.CVStore.jobSeeker.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CandidateAuthResponse {

    String token;
    Long id;
    String fullName;
    String email;
    String phone;


}
