package com.example.GigAnt.controller;

import com.example.GigAnt.model.dto.request.ProfileCreateRequest;
import com.example.GigAnt.model.dto.response.ProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ProfileController {
  @PostMapping("/profile")
  public ResponseEntity<ProfileResponse> createProfile(@Validated @RequestBody ProfileCreateRequest){

  }


}
