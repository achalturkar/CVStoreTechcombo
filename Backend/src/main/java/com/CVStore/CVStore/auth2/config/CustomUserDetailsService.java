package com.CVStore.CVStore.auth2.config;


import com.CVStore.CVStore.auth2.entity.Users;
import com.CVStore.CVStore.auth2.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UsersRepository usersRepository;



    @Override
    public UserDetails loadUserByUsername(String email) throws
            UsernameNotFoundException {
        Users users = usersRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        System.out.println("User loaded: " + users.getEmail());
        return users;

    }

}
