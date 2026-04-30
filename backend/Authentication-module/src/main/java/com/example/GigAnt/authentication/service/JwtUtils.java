package com.example.GigAnt.authentication.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;
import javax.crypto.SecretKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class JwtUtils {


  private final JwtParser jwtParser;
  private final SecretKey signingKey;


  public JwtUtils(@Value("${jwt.secret}") String secret,   @Value("${api.domain}") String issuer) {
    validateSecret(secret);
    this.signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    this.jwtParser = Jwts.parser()
        .verifyWith(signingKey)
            .requireIssuer(issuer)      // Кто выдал токен
             .requireAudience("gigant-backend")              // Для кого токен
            .clockSkewSeconds(30)
            .build();

    log.info("JWT parser initialized successfully with HS256 algorithm");
  }

  private void validateSecret(String secret) {
    if (secret == null || secret.isBlank()) {
      throw new IllegalStateException(
          "JWT secret is not configured. Set jwt.secret property or JWT_SECRET env variable.");
    }
    if (secret.length() < 32) {
      throw new IllegalStateException(
          "JWT secret must be at least 32 characters for HS256. Current length: " + secret.length()
      );
    }
  }

  public Claims extractAllClaims(String token) {
    return parseClaimsJws(token);
  }

  protected Claims parseClaimsJws(String token) {
    try {
      return jwtParser.parseSignedClaims(token).getPayload();
    } catch (JwtException e) {
      throw e;
    } catch (Exception e) {
      throw new RuntimeException("Failed to parse token: " + e.getMessage(), e);
    }
  }


  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final var claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  public Date getExpiration(Claims claims) {
    return claims.getExpiration();
  }

  public Date extractIssuedAt(String token) {
    return extractClaim(token, Claims::getIssuedAt);
  }

  public boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  public boolean isTokenExpired(Claims claims) {
    return getExpiration(claims).before(new Date());
  }



  public String extractAccountId(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public String getEmail(Claims claims) {
    return claims.get("email", String.class);
  }

  public String getAccountId(Claims claims) {
    return claims.getSubject();
  }


}
