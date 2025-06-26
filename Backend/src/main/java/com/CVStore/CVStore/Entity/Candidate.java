package com.CVStore.CVStore.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.processing.Pattern;

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

    private  String filePath;


}
