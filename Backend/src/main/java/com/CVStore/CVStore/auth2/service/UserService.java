package com.CVStore.CVStore.auth2.service;


import com.CVStore.CVStore.auth2.dto.RegisterRequest;
import com.CVStore.CVStore.auth2.entity.Role;
import com.CVStore.CVStore.auth2.entity.Users;
import com.CVStore.CVStore.auth2.repository.UsersRepository;
import com.CVStore.CVStore.customId.CustomIdGenerator;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomIdGenerator customIdGenerator;



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
                .role(role)
                .enabled(true)
                .build();
        return usersRepository.save(users);
    }
    public List<Users> findAll() {
        return usersRepository.findAll();
    }


}
