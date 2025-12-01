package com.CVStore.CVStore.common.otp;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
public class OtpRecord {
    private String otp;
    private Instant expiry;
}



