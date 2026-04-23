package com.example.GigAnt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())     // отключаем CSRF
        .authorizeHttpRequests(
            auth -> auth.anyRequest().permitAll()); // разрешаем все запросы без аутентификации
    return http.build();
  }
}