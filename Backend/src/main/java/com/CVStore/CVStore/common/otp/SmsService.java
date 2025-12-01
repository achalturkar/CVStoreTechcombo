//package com.CVStore.CVStore.common.otp;
//
//import com.twilio.rest.api.v2010.account.Message;
//import com.twilio.Twilio;
//import com.twilio.type.PhoneNumber;
//import org.springframework.stereotype.Service;
//
//@Service
//public class SmsService {
//    private final TwilioConfig twilioConfig;
//
//    public SmsService(TwilioConfig twilioConfig) {
//        this.twilioConfig = twilioConfig;
//        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
//    }
//
//    public String sendOtp(String mobileNumber, String otp) {
//        Message message = Message.creator(
//                new PhoneNumber(mobileNumber),
//                new PhoneNumber(twilioConfig.getPhoneNumber()),
//                "Your OTP is: " + otp + " (valid for 5 minutes)."
//        ).create();
//
//        return message.getSid();   // useful for logs
//    }
//}
