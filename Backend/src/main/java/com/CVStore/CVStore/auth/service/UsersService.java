//package com.CVStore.CVStore.auth.service;
//
//import com.CVStore.CVStore.auth.dto.RegisterRequest;
//import com.CVStore.CVStore.auth.entiry.Role;
//import com.CVStore.CVStore.auth.entiry.Users;
//import com.CVStore.CVStore.auth.repository.UsersRepository;
//import com.CVStore.CVStore.customId.CustomIdGenerator;
//import jakarta.transaction.Transactional;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class UsersService {
//
//    private final UsersRepository usersRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final CustomIdGenerator customIdGenerator;
//
//    @Transactional
//    public Users register(@Valid RegisterRequest request) {
//        if(usersRepository.existsByEmail(request.email())){
//            throw new IllegalArgumentException("Email Already Exist");
//        }
//
//        Role userRole = request.role() != null ? request.role() : Role.HR;
//
//        Users users = Users.builder()
//                .fullName(request.fullName())
//                .userId(request.userId())
//                .email(request.email())
//                .mobile(request.mobile())
//                .password(passwordEncoder.encode(request.password()))
//                .role(userRole)
//                .enabled(true)
//                .build();
//
//        return usersRepository.save(users);
//    }
//
//    /**
//     * Implements the logic for Spring Security to fetch the user by email (username).
//     */
////    @Override
////    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
////        // This is the core login mechanism that fetches the user object for password comparison.
////        return usersRepository.findByEmail(email)
////                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
////    }
//}
//
//
//
//
//
//
//
//
