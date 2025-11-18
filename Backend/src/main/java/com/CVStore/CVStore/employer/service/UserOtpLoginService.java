package com.CVStore.CVStore.employer.service;

import com.CVStore.CVStore.employer.entity.UserLoginOtp;
import com.CVStore.CVStore.employer.repository.UserLoginOtpRepository;
import com.CVStore.CVStore.employer.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class UserOtpLoginService {

    @Autowired
    private UserLoginOtpRepository userLoginOtpRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private EmailService emailService;

    public void sendOtpToEmail(String email) {

        // Check if user exists
        var user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate OTP
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        UserLoginOtp loginOtp = new UserLoginOtp();
        loginOtp.setEmail(email);
        loginOtp.setOtp(otp);
        loginOtp.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        userLoginOtpRepository.save(loginOtp);

        // Send email
        emailService.sendOtp(email, otp);
    }

    public String verifyOtp(String email, String otp) {

        var otpRecord = userLoginOtpRepository.findByEmailAndOtpAndUsedFalse(email, otp)
                .orElseThrow(() -> new RuntimeException("Invalid OTP"));

        if (otpRecord.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP Expired");
        }

        otpRecord.setUsed(true);
        userLoginOtpRepository.save(otpRecord);

        return "OTP Verified";
    }
}
