package com.example.GigAnt.authentication.controller;

import com.example.GigAnt.authentication.model.dto.request.DataRegistrationRequest;
import com.example.GigAnt.authentication.model.dto.request.RegisterRequest;
import com.example.GigAnt.authentication.model.dto.response.Auth;
import com.example.GigAnt.authentication.model.dto.response.DataRegistrationResponse;
import com.example.GigAnt.authentication.model.dto.response.RegisterResponse;
import com.example.GigAnt.authentication.service.AccountService;
import com.example.GigAnt.authentication.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/registration")
public class RegistrationController {

  private final AccountService accountService;
  private final AuthenticationService authenticationService;

  @PostMapping("/step-one")
  public ResponseEntity<RegisterResponse> registerAccount(
      @RequestBody @Validated RegisterRequest request) {
    return ResponseEntity.ok(accountService.registerAccount(request));
  }

  @PostMapping("/confirm-email")
  public ResponseEntity<Auth> confirmEmail(@RequestBody Auth token) {

  }

  @PostMapping("/step-three")
  public ResponseEntity<DataRegistrationResponse> registerFinalStep(@RequestBody
  DataRegistrationRequest request) {

  }

}
