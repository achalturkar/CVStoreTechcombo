//package com.CVStore.CVStore.config.Config;
//
//import com.CVStore.CVStore.auth.jwt.config.CandidateUserDetailsService;
//import com.CVStore.CVStore.auth.jwt.config.CustomUserDetailsService;
//import com.CVStore.CVStore.auth.jwt.filter.JwtAuthFilter;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Primary;
//import org.springframework.core.annotation.Order;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.ProviderManager;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.web.cors.CorsConfigurationSource;
//
//import java.util.List;
//@Configuration
//@EnableMethodSecurity
//@RequiredArgsConstructor
//public class SecurityConfig {
//
//    private final JwtAuthFilter jwtAuthFilter;
//    private final CorsConfigurationSource corsConfigurationSource;
//    private final CustomUserDetailsService customUserDetailsService;
//    private final CandidateUserDetailsService candidateUserDetailsService;
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable())
//                .cors(cors -> cors.configurationSource(corsConfigurationSource))
//                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/auth/**").permitAll()
//                        .requestMatchers("/api/all/**").permitAll()
//                        .requestMatchers("/api/superadmin/**").hasRole("SUPERADMIN")
//                        .anyRequest().authenticated()
//                )
//                .authenticationProvider(candidateAuthenticationProvider())
//                .authenticationProvider(employerAuthenticationProvider())
//                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
//
//    @Bean
//    public AuthenticationProvider employerAuthenticationProvider() {
//        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//        provider.setUserDetailsService(customUserDetailsService);
//        provider.setPasswordEncoder(passwordEncoder());
//        return provider;
//    }
//
//    @Bean
//    public AuthenticationProvider candidateAuthenticationProvider() {
//        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//        provider.setUserDetailsService(candidateUserDetailsService);
//        provider.setPasswordEncoder(passwordEncoder());
//        return provider;
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean("employerAuthManager")
//    public AuthenticationManager employerAuthenticationManager() {
//        return new ProviderManager(List.of(employerAuthenticationProvider()));
//    }
//
//    @Order(1)
//    @Bean("candidateAuthManager")
//    public AuthenticationManager candidateAuthenticationManager() {
//        return new ProviderManager(List.of(candidateAuthenticationProvider()));
//    }
//
//    @Bean
//    @Primary
//    public AuthenticationManager defaultAuthenticationManager() {
//        return new ProviderManager(
//                List.of(candidateAuthenticationProvider(), employerAuthenticationProvider()));
//    }
//
//
//}
