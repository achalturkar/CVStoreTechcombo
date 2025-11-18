package com.CVStore.CVStore.jobSeeker.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
public class Candidate implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String fullName;

    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @NotNull
    private String phone;

    @NotNull
    private String password;

    @OneToOne(mappedBy = "candidate",cascade = CascadeType.ALL)
    private PersonalInfo personalInfo;

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL)
    private List<Education> education;

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<CandidateSkill> candidateSkills = new HashSet<>();


    @OneToOne(mappedBy = "candidate", cascade = CascadeType.ALL)
    private ProfileImage profileImage;



    // --- UserDetails ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "ROLE_CANDIDATE");
    }



    @Override
    public String getUsername() {
        return email;
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }

}
