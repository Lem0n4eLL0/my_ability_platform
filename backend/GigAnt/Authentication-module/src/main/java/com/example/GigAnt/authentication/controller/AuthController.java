package com.example.GigAnt.authentication.controller;

import com.example.GigAnt.authentication.config.JwtProperties;
import com.example.GigAnt.authentication.model.dto.Tokens;
import com.example.GigAnt.authentication.model.dto.request.AccountRequest;
import com.example.GigAnt.authentication.model.dto.request.RegisterRequest;
import com.example.GigAnt.authentication.model.dto.response.AuthResponse;
import com.example.GigAnt.authentication.model.dto.response.RegisterResponse;
import com.example.GigAnt.authentication.model.entity.Account;
import com.example.GigAnt.authentication.service.AccountService;
import com.example.GigAnt.authentication.service.AuthenticationService;
import com.example.GigAnt.authentication.service.JwtService;
import com.example.GigAnt.authentication.service.RefreshTokenService;
import com.example.GigAnt.authentication.utils.CookieUtils;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotBlank;
import java.time.Duration;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

  private final JwtService jwtService;
  private final AccountService accountService;
  private final AuthenticationService authenticationService;
  private final RefreshTokenService refreshTokenService;
  private final JwtProperties jwtProperties;


  @PostMapping("/login")
  public ResponseEntity login(@RequestBody AccountRequest request) {

    Account account = authenticationService.authenticate(request);

    var tokens = Tokens.builder()
        .token(jwtService.generateAccessToken(account))
        .refreshToken(refreshTokenService.createRefreshToken(account))
        .build();
    var cookie = CookieUtils.createTokenCookie(tokens.getRefreshToken(),
        Duration.ofMillis(jwtProperties.getRefresh().getExpiration()));
    return ResponseEntity.ok(Map.of(
        "accessToken", tokens.getToken(),
        "refreshToken", tokens.getRefreshToken()
    ));
  }

  @PostMapping("/register")
  public ResponseEntity<RegisterResponse> registerAccount(
      @RequestBody @Validated RegisterRequest request) {
    return ResponseEntity.ok(accountService.registerAccount(request));
  }

  @GetMapping
  public String test() {
    return "HELLO AUTHIST";
  }

  @PostMapping("/refresh")
  public ResponseEntity<AuthResponse> refreshToken(
      @CookieValue(name = "refresh_token") @NotBlank String refreshToken,
      HttpServletResponse response) {
    var tokens = authenticationService.refreshToken(refreshToken);
    var cookie = CookieUtils.createTokenCookie(tokens.getRefreshToken(),
        Duration.ofMillis(jwtProperties.getRefresh().getExpiration()));
    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    return ResponseEntity.ok(new AuthResponse(tokens.getToken()));
  }
}
