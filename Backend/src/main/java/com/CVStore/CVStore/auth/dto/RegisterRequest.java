//package com.CVStore.CVStore.auth.dto;
//
//import com.CVStore.CVStore.auth.entiry.Role;
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.Size;
//
//public record RegisterRequest(
//        @NotBlank String fullName,
//        @NotBlank String userId,
//        @Email String email,
//        @NotBlank String mobile,
//        @Size(min = 8, message = "Password must be at least 8 character") String password,
//        Role role
//) {
//}
