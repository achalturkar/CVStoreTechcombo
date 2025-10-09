package com.CVStore.CVStore.auth2.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/all")
public class HelloController {

    @GetMapping("/open")
    public String open(){
        return "Sab k liye open hai";
    }
}
