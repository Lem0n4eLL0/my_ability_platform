package com.example.GigAnt.authentication.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

  private String secret;
  private Access access;
  private Refresh refresh;

  @Data
  public static class Access {

    private long expiration;
  }

  @Data
  public static class Refresh {

    private long expiration;
  }
}
