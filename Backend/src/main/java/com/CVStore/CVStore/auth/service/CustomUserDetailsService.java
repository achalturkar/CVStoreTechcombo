//package com.CVStore.CVStore.auth.service;
//
//import com.CVStore.CVStore.auth.entiry.Users;
//import com.CVStore.CVStore.auth.repository.UsersRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class CustomUserDetailsService implements UserDetailsService {
//
//    private final UsersRepository usersRepository;
//
//
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        System.out.println("🔍 Trying to load user: " + email);
//        Users users=  usersRepository.findByEmail(email)
//                .orElseThrow(()-> new UsernameNotFoundException("Email not Found: " + email));
//        System.out.println("User loaded: " + users.getEmail());
//        return  users;
//
//    }
//}
