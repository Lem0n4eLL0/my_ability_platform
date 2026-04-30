package com.example.GigAnt.authentication.controller;

import com.example.GigAnt.authentication.config.JwtProperties;
import com.example.GigAnt.authentication.model.dto.request.AccountRequest;
import com.example.GigAnt.authentication.model.dto.response.Auth;
import com.example.GigAnt.authentication.model.entity.Account;
import com.example.GigAnt.authentication.service.AccountService;
import com.example.GigAnt.authentication.service.AuthenticationService;
import com.example.GigAnt.authentication.service.JwtService;
import com.example.GigAnt.authentication.service.RefreshTokenService;
import com.example.GigAnt.authentication.service.TokenService;
import com.example.GigAnt.authentication.utils.CookieUtils;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotBlank;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

  private final JwtService jwtService;
  private final TokenService tokenService;
  private final AccountService accountService;
  private final AuthenticationService authenticationService;
  private final RefreshTokenService refreshTokenService;
  private final JwtProperties jwtProperties;


  @PostMapping()
  public ResponseEntity login(@RequestBody AccountRequest request) {

    Account account = authenticationService.authenticate(request);

    return ResponseEntity.ok(tokenService.getTokens(account));
  }


  @PostMapping("/refresh")
  public ResponseEntity<Auth> refreshToken(
      @CookieValue(name = "refresh_token") @NotBlank String refreshToken,
      HttpServletResponse response) {
    var tokens = authenticationService.refreshToken(refreshToken);
    var cookie = CookieUtils.createTokenCookie(tokens.getRefreshToken(),
        Duration.ofMillis(jwtProperties.getRefresh().getExpiration()));
    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    return ResponseEntity.ok(new Auth(tokens.getToken()));
  }
}
