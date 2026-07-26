//package com.example.GigAnt.config;
//
//import com.example.GigAnt.authentication.filter.JwtAuthenticationFilter;
//import com.example.GigAnt.filter.RateLimitFilter;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class SecurityConfig {
//
//  private final JwtAuthenticationFilter jwtAuthenticationFilter;
//  private final RateLimitFilter rateLimitFilter;
//
//  @Bean
//  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//    return http
//        .csrf(AbstractHttpConfigurer::disable)
//            .addFilterBefore(rateLimitFilter, UsernamePasswordAuthenticationFilter.class)
//        .authorizeHttpRequests(auth -> auth
//            // Публичные эндпоинты
//            .requestMatchers("/api/v1/registration/**", "/api/v1/auth/**", "/actuator/**")
//            .permitAll()
//            // Требуют аутентификации
//            .requestMatchers("/api/v1/profile/**").authenticated()
//            .requestMatchers("/api/v1/tests/**", "/api/v1/verification/**").authenticated()
//            .anyRequest().permitAll()
//        )
//        .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
//        .build();
//  }
//}