package com.CVStore.CVStore.auth2.controller;



import com.CVStore.CVStore.auth2.entity.Users;
import com.CVStore.CVStore.auth2.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/superadmin")
public class AdminController {
    private final UserService userService;



//    @PreAuthorize("hasRole('ADMIN', 'SUPERADMIN', 'HR')")
    @GetMapping("/users")
    public List<Users> allUsers() {
        return userService.findAll();
    }

    @PreAuthorize("hasRole('SUPERADMIN')")
    @GetMapping("/hello")
    public String helloAdmin() {
        return "Hello, ADMIN";
    }
}
