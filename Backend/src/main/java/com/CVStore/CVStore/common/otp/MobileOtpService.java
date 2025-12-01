package com.CVStore.CVStore.common.otp;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Service
public class MobileOtpService {

    private final SmsService smsService;
    private final Map<String, OtpRecord> otpStore = new HashMap<>();
    private final SecureRandom random = new SecureRandom();

    public MobileOtpService(SmsService smsService) {
        this.smsService = smsService;
    }

    // Generate 6-digit OTP
    public String generateOtp() {
        return String.valueOf(100000 + random.nextInt(900000));
    }

    // Send OTP to mobile
    public void sendMobileOtp(String mobile) {
        String otp = generateOtp();
        otpStore.put(mobile, new OtpRecord(otp, Instant.now().plus(Duration.ofMinutes(5))));
        smsService.sendOtp(mobile, otp);
    }

    // Verify OTP
    public boolean verifyMobileOtp(String mobile, String otp) {
        OtpRecord record = otpStore.get(mobile);

        if (record == null) return false;
        if (record.getExpiry().isBefore(Instant.now())) return false;

        boolean verified = record.getOtp().equals(otp);

        if (verified) otpStore.remove(mobile);

        return verified;
    }
}

