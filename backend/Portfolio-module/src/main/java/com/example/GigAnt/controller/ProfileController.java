package com.example.GigAnt.controller;

import static com.example.GigAnt.headers.AppHeaders.ACCOUNT_ID;

import com.example.GigAnt.model.dto.request.ProfileCreateRequest;
import com.example.GigAnt.model.dto.response.ProfileResponse;
import com.example.GigAnt.service.ProfileService;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ProfileController {
  private final ProfileService service;
  @GetMapping("/get")
  public String get(){
    return "PROFILE";
  }
  @PostMapping("/profile")
  public ResponseEntity<ProfileResponse> createProfile(@Validated @RequestBody ProfileCreateRequest request,@RequestHeader(ACCOUNT_ID) @NotNull UUID accountId){
      return ResponseEntity.ok(service.createProfile(request,accountId));
  }
  @GetMapping("/me")
  public ResponseEntity<ProfileResponse> getProfile(@RequestHeader(ACCOUNT_ID) @NotNull UUID accountId){
    return ResponseEntity.ok(service.getProfile(accountId));

  }

  @PatchMapping("/me")
  public ResponseEntity<ProfileResponse> updateProfile(@Validated @RequestBody ProfileCreateRequest request, @RequestHeader(ACCOUNT_ID) @NotNull UUID accountId){
    return ResponseEntity.ok(service.updateProfile(request,accountId));
  }

  @DeleteMapping("/me")
  public ResponseEntity<ProfileResponse> deleteProfile(@RequestHeader(ACCOUNT_ID) @NotNull UUID accountId){
    return ResponseEntity.ok(service.deleteProfile(accountId));

  }




}
