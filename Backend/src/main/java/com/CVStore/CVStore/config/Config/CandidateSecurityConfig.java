package com.CVStore.CVStore.config.Config;
import com.CVStore.CVStore.auth.jwt.config.CandidateUserDetailsService;
import com.CVStore.CVStore.auth.jwt.filter.CandidateJwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
@Order(2)
public class CandidateSecurityConfig {
    private final CandidateJwtAuthFilter candidateJwtAuthFilter;
    private final CorsConfigurationSource corsConfigurationSource;
    private final CandidateUserDetailsService candidateUserDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public SecurityFilterChain candidateSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/api/candidate/**", "/api/auth/candidate/**")
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/candidate/**").permitAll()
                        .requestMatchers("/api/skills/**").hasRole("CANDIDATE")
                        .anyRequest().hasRole("CANDIDATE")
                )
                .authenticationProvider(candidateAuthenticationProvider())
                .addFilterBefore(candidateJwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider candidateAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(candidateUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    public AuthenticationManager candidateAuthManager() {
        return new ProviderManager(List.of(candidateAuthenticationProvider()));
    }
}
