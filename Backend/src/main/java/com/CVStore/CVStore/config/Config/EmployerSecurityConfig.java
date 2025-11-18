package com.CVStore.CVStore.config.Config;
import com.CVStore.CVStore.auth.jwt.config.CustomUserDetailsService;
import com.CVStore.CVStore.auth.jwt.filter.EmployerJwtAuthFilter;
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
@Order(1)
public class EmployerSecurityConfig {
    private final EmployerJwtAuthFilter employerJwtAuthFilter;
    private final CorsConfigurationSource corsConfigurationSource;
    private final CustomUserDetailsService customUserDetailsService;
    private final PasswordEncoder passwordEncoder;

//    @Bean
//    public SecurityFilterChain employerSecurityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .securityMatcher("/api/recruit/**", "/api/auth/recruit/**")
//                .csrf(csrf -> csrf.disable())
//                .cors(cors -> cors.configurationSource(corsConfigurationSource))
//                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/auth/recruit/**").permitAll()
////                        .requestMatchers("/api/resume-data/**").hasAnyRole("ADMIN","SUPERADMIN","HR")
//                        .anyRequest().hasAnyRole("HR","ADMIN", "SUPERADMIN")
//                )
//                .authenticationProvider(employerAuthenticationProvider())
//                .addFilterBefore(employerJwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }

    @Bean
    public SecurityFilterChain employerSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/api/recruit/**", "/api/auth/recruit/**", "/api/resume-data/**") // 👈 include resume-data here
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
//                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin())) // <-- Add this
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll() // 👈 allow CORS preflight
                        .requestMatchers("/api/auth/recruit/**", "/api/resume-data/**").permitAll()
                        .requestMatchers("/api/resume-data/**").hasAnyRole("HR", "ADMIN", "SUPERADMIN") // 👈 allow employer roles
                        .requestMatchers("/api/resume-data/view/**").permitAll()

                        .anyRequest().authenticated()
                )
                .authenticationProvider(employerAuthenticationProvider())
                .addFilterBefore(employerJwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider employerAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(customUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    @Primary
    public AuthenticationManager employerAuthManager() {
        return new ProviderManager(List.of(employerAuthenticationProvider()));
    }
}
