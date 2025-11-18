package com.CVStore.CVStore.employer.repository;

import com.CVStore.CVStore.employer.entity.UserLoginOtp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserLoginOtpRepository extends JpaRepository<UserLoginOtp, Long> {
    Optional<UserLoginOtp> findByEmailAndOtpAndUsedFalse(String email, String otp);

}
