package com.example.GigAnt.authentication.service;

import com.example.GigAnt.authentication.config.JwtProperties;
import com.example.GigAnt.authentication.model.dto.Tokens;
import com.example.GigAnt.authentication.model.entity.Account;
import com.example.GigAnt.authentication.utils.CookieUtils;
import io.jsonwebtoken.Jwts;
import java.time.Duration;
import java.util.Date;
import java.util.Map;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtService {

  private final JwtProperties jwtProperties;
  private final JwtService jwtService;
  private final RefreshTokenService refreshTokenService;
  private final SecretKey secretKey;

  public String generateAccessToken(Account account) {
    return generateToken(account, jwtProperties.getAccess().getExpiration());
  }

  public String generateRefreshToken(Account account) {
    return generateToken(account, jwtProperties.getRefresh().getExpiration());
  }

  public Map<String, String> getTokens(Account account) {
    var tokens = Tokens.builder()
        .token(jwtService.generateAccessToken(account))
        .refreshToken(refreshTokenService.createRefreshToken(account))
        .build();
    var cookie = CookieUtils.createTokenCookie(tokens.getRefreshToken(),
        Duration.ofMillis(jwtProperties.getRefresh().getExpiration()));
    return Map.of(
        "accessToken", tokens.getToken(),
        "refreshToken", tokens.getRefreshToken()
    );
  }

  public String generateEmailToken(Account account, long expirationMs) {
    var now = new Date();
    var expiry = new Date(now.getTime() + expirationMs);

    return Jwts.builder()
        .subject(account.getId().toString())
        .claim("type", "EMAIL_VERIFICATION")
        .claim("email", account.getEmail())
        .issuedAt(now)
        .expiration(expiry)
        .signWith(secretKey)
        .compact();
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