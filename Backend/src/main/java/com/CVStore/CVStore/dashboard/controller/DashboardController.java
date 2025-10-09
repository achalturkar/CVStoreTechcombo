package com.CVStore.CVStore.dashboard.controller;

import com.CVStore.CVStore.candidate.Repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardController {

    @Autowired
    private CandidateRepository candidateRepository;

    @GetMapping("/count")
    public long count(){
        return  candidateRepository.count();
    }



}
