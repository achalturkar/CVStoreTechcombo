package com.CVStore.CVStore.auth.jwt.error;

import org.springframework.http.HttpStatus;

import java.time.Instant;
public record ApiError(HttpStatus status, String message, Instant timestamp) {
    public static ApiError of(HttpStatus status, String message) {
        return new ApiError(status, message, Instant.now());
    }
}

