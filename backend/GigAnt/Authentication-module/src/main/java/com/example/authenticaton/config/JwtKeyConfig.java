package com.example.authenticaton.config;


import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import javax.crypto.SecretKey;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtKeyConfig {

  @Bean
  public SecretKey jwtSecretKey(JwtProperties properties) {
    String secret = properties.getSecret();

    if (secret == null || secret.length() < 32) {
      throw new IllegalArgumentException(
          "JWT secret must be at least 32 characters for HS256 algorithm"
      );
    }

    return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
  }
}