package com.example.authentication.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class GeneratePasswordHash {

  static String generatePasswordHash(String password) {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    return passwordEncoder.encode(password);

  }

  static boolean isMatches(String hashBD, String hashPasswords) {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    if (passwordEncoder.matches(hashBD, hashPasswords)) {
      return true;
    }
    return false;
  }


}
