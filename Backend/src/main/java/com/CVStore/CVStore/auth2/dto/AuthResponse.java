package com.CVStore.CVStore.auth2.dto;


import com.CVStore.CVStore.auth2.entity.Role;

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
