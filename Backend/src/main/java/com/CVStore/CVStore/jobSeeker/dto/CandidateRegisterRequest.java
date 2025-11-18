package com.CVStore.CVStore.jobSeeker.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CandidateRegisterRequest {
    @NotBlank
    String fullName;

    @NotNull
    String phone;

    @Email
    String email;

    @Size(min = 8, message = "Password must be at least 8 chars") String
            password;
}
