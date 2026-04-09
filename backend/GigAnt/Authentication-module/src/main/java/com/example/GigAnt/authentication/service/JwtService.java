package com.example.GigAnt.authentication.service;

import com.example.GigAnt.authentication.config.JwtProperties;
import com.example.GigAnt.authentication.model.entity.Account;
import io.jsonwebtoken.Jwts;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtService {

  private final JwtProperties jwtProperties;
  private final SecretKey secretKey;  // ✅ Внедряем готовый ключ

  public String generateAccessToken(Account account) {
    return generateToken(account, jwtProperties.getAccess().getExpiration());
  }

  public String generateRefreshToken(Account account) {
    return generateToken(account, jwtProperties.getRefresh().getExpiration());
  }

  private String generateToken(Account account, long expirationMs) {
    var now = new Date();
    var expiry = new Date(now.getTime() + expirationMs);

    return Jwts.builder()
        .subject(account.getId().toString())
        .claim("role", account.getRole())
        .claim("email", account.getEmail())
        .issuedAt(now)
        .expiration(expiry)
        .signWith(secretKey)
        .compact();
  }
}