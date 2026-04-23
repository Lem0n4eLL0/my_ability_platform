package com.example.GigAnt.authentication.utils;

import java.time.Duration;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public final class CookieUtils {

  private CookieUtils() {
  }

  public static ResponseCookie createTokenCookie(String value, Duration duration) {
    return ResponseCookie.from("refresh_token", value)
        .httpOnly(true)
        .secure(true)
        .path("/")
        .maxAge(duration)
        .sameSite("None")
        .build();
  }
}