package com.example.GigAnt.authentication.service;

import com.example.GigAnt.authentication.config.JwtProperties;
import com.example.GigAnt.authentication.model.dto.Tokens;
import com.example.GigAnt.authentication.model.entity.Account;
import com.example.GigAnt.authentication.utils.CookieUtils;
import java.time.Duration;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TokenService {

  private final JwtService jwtService;
  private final RefreshTokenService refreshTokenService;
  private final JwtProperties jwtProperties;

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

}
