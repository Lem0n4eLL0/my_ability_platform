package com.example.GigAnt.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ProfileController {
//  @PostMapping("/profile")
//  public ResponseEntity<ProfileResponse> createProfile(@RequestBody ProfileCreateRequest){
//
//  }
  @GetMapping
  public String profile(){
    return "mzzzzu";
  }

}
