//package com.CVStore.CVStore.common.otp;
//
//import com.twilio.rest.api.v2010.account.Message;
//import com.twilio.type.PhoneNumber;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/mobile")
//public class MobileOtpController {
//
//    private final TwilioConfig twilioConfig;
//
//    private final MobileOtpService otpService;
//
//
//    public MobileOtpController(TwilioConfig twilioConfig, MobileOtpService otpService) {
//        this.twilioConfig = twilioConfig;
//        this.otpService = otpService;
//    }
//
//    // Send OTP
////    @PostMapping("/send-otp")
////    public ResponseEntity<?> sendOtp(@RequestParam String mobile) {
////        otpService.sendMobileOtp(mobile);
////        return ResponseEntity.ok("OTP sent successfully");
////    }
//    @PostMapping("/send-otp")
//    public ResponseEntity<?> sendOtp(@RequestParam String mobile) {
//        try {
//            // Clean the number
//            mobile = mobile.trim();                  // remove trailing/leading spaces
//            mobile = mobile.replaceAll("\\s+", "");  // remove all spaces
//            mobile = mobile.replaceAll("-", "");     // remove dashes
//
//            // Ensure +91 prefix
//            if (!mobile.startsWith("+")) {
//                mobile = "+91" + mobile;
//            }
//
//            System.out.println("Sending to: " + mobile);
//
//            Message.creator(
//                    new PhoneNumber(mobile),
//                    new PhoneNumber(twilioConfig.getPhoneNumber()),
//                    "Your OTP is 123456"
//            ).create();
//
//            return ResponseEntity.ok("OTP Sent Successfully");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(400).body(e.getMessage());
//        }
//    }
//
//
//    // Verify OTP
//    @PostMapping("/verify-otp")
//    public ResponseEntity<?> verifyOtp(
//            @RequestParam String mobile,
//            @RequestParam String otp) {
//
//        boolean verified = otpService.verifyMobileOtp(mobile, otp);
//
//        if (verified) return ResponseEntity.ok("Mobile number verified");
//
//        return ResponseEntity.status(400).body("Invalid or expired OTP");
//    }
//}
