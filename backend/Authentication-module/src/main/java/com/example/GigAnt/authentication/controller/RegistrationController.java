package com.example.GigAnt.authentication.controller;

import com.example.GigAnt.authentication.model.dto.request.EmailConfirmRequest;
import com.example.GigAnt.authentication.model.dto.request.RegisterRequest;
import com.example.GigAnt.authentication.model.dto.response.Auth;
import com.example.GigAnt.authentication.model.dto.response.RegisterResponse;
import com.example.GigAnt.authentication.model.entity.Account;
import com.example.GigAnt.authentication.service.AccountService;
import com.example.GigAnt.authentication.service.AuthenticationService;
import com.example.GigAnt.authentication.service.EmailVerificationService;
import com.example.GigAnt.authentication.service.JwtService;
import com.example.GigAnt.authentication.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/registration")
public class RegistrationController {

  private final AccountService accountService;
  private final AuthenticationService authenticationService;
  private final EmailVerificationService emailVerificationService;
  private final JwtService jwtService;
  private final TokenService tokenService;

  @PostMapping("/step-one")
  public ResponseEntity<RegisterResponse> registerAccount(
      @RequestBody @Validated RegisterRequest request) {
    return ResponseEntity.ok(accountService.registerAccount(request));
  }

  @GetMapping("/confirm-email")
  public ResponseEntity<Auth> confirmEmail(@RequestParam("token") String token) {
    Account account = emailVerificationService.confirmEmail(token);
    var tokens = tokenService.getTokens(account);
    return ResponseEntity.ok(new Auth(tokens.get("accessToken")));
  }

}


