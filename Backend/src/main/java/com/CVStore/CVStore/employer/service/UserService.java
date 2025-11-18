package com.CVStore.CVStore.employer.service;


import com.CVStore.CVStore.employer.dto.RegisterRequest;
import com.CVStore.CVStore.employer.entity.Role;
import com.CVStore.CVStore.employer.entity.Users;
import com.CVStore.CVStore.employer.repository.UsersRepository;
import com.CVStore.CVStore.customId.CustomIdGenerator;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserService extends DefaultOAuth2UserService {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomIdGenerator customIdGenerator;
    private final EmailService emailService;



    @Transactional
    public Users register(@Valid RegisterRequest req) {
        if (usersRepository.existsByEmail(req.email())) {
            throw new IllegalArgumentException("Email already registered");
        }
        Role role = req.role() == null ? Role.HR : req.role();
        String newUniqueId = customIdGenerator.generateUserId();

        Users users = Users.builder()
                .uniqueId(newUniqueId)
                .fullName(req.fullName())
                .mobile(req.mobile())
                .email(req.email())
                .password(passwordEncoder.encode(req.password()))
                .companyName(req.companyName())
                .role(role)
                .enabled(true)
                .build();
        return usersRepository.save(users);
    }
    public List<Users> findAll() {
        return usersRepository.findAll();
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String fullName = oAuth2User.getAttribute("fullName");


        // Register HR if not exist
        Users user = usersRepository.findByEmail(email)
                .orElseGet(() -> {
                    Users newUser = new Users();
                    newUser.setEmail(email);
                    newUser.setFullName(fullName);
                    newUser.setRole(Role.HR);
                    return usersRepository.save(newUser);
                });

        return oAuth2User;
    }


    //------Password reset------

    public void forgotPassword(String email) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email"));

        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15));
        usersRepository.save(user);

        String resetLink = "http://admin.techcombo.in/reset-password/" + token;
        emailService.sendResetEmail(user.getEmail(), resetLink);
    }

    public void resetPassword(String token, String newPassword) {
        Users user = usersRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired token"));

        if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token has expired");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        usersRepository.save(user);
    }

}
