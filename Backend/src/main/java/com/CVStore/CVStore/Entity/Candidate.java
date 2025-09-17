package com.CVStore.CVStore.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.processing.Pattern;

import java.time.LocalDateTime;

@Data
@Entity
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String fullName;

    @Column(unique = true)
    private String phoneNumber;

    @Column(unique = true)
    private String email;

    private String experience;

    private String skills;

    private String address;

    private String company;

    private String education;

    private String designation;

    private String linkedIn;

    private  String filePath;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @UpdateTimestamp
    private LocalDateTime updatedDate;


}
