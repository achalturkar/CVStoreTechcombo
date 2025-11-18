package com.CVStore.CVStore.resumeData.Entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
public class ResumeData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(columnDefinition = "TEXT" )
    private String fullName;

    @Column(unique = false, columnDefinition = "TEXT")
    private String phoneNumber;


    @Column(unique = true, columnDefinition = "TEXT")
    private String email;

    @Column(columnDefinition = "TEXT" )
    private String experience;

    @Column(columnDefinition = "TEXT")
    private String skills;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(columnDefinition = "TEXT")
    private String company;

    @Column(columnDefinition = "TEXT")
    private String education;

    @Column(columnDefinition = "TEXT")
    private String designation;

    @Column(columnDefinition = "TEXT")
    private String linkedIn;

    @Column(columnDefinition = "TEXT")
    private  String filePath;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @UpdateTimestamp
    private LocalDateTime updatedDate;

    @Column(name = "file_hash", length = 64)
    private String fileHash;


}
