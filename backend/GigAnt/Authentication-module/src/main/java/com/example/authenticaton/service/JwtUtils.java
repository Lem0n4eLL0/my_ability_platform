package com.example.authenticaton.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import java.util.Date;
import java.util.function.Function;

public class JwtUtils {

  private JwtParser jwtParser;

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

  public String getAccountId(Claims claims) {
    return claims.getSubject();
  }

}
