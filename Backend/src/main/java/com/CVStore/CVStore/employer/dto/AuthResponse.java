package com.CVStore.CVStore.employer.dto;


import com.CVStore.CVStore.employer.entity.Role;

public record AuthResponse(
        String token,
        Long id,
        String uniqueId,
        String fullName,
        String email,
        String mobile,
        String companyName,
        Role role
) {}
