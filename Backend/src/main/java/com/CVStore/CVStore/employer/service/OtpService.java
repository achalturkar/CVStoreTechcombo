package com.CVStore.CVStore.employer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private JavaMailSender mailSender;

    private Map<String, String> otpStorage = new HashMap<>();

    public String generateOtp() {
        int otp = new Random().nextInt(999999);
        return String.format("%06d", otp);
    }

    public void sendOtpEmail(String email) {
        String otp = generateOtp();
        otpStorage.put(email, otp);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your Email Verification OTP");
        message.setText("Your OTP for verification is: " + otp + "\n\nValid for 10 minutes.");

        mailSender.send(message);
    }

    public boolean verifyOtp(String email, String otp) {
        String storedOtp = otpStorage.get(email);

        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(email);
            return true;
        }
        return false;
    }
}

