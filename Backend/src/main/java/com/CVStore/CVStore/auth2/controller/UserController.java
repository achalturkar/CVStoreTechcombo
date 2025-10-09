package com.CVStore.CVStore.auth2.controller;


import com.CVStore.CVStore.auth2.entity.Users;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hr")
public class UserController {
    @GetMapping("/profile")
    public Users profile(@AuthenticationPrincipal Users users) {
        return users;
    }
    @GetMapping("/hello")
    public String helloUser() {
        return "Hello, authenticated USER or ADMIN";
    }
}

