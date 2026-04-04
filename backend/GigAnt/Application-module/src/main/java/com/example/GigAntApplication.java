package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;


@ComponentScan(basePackages = {
    "com.example",
    "com.example.application",      // Главный модуль
    "com.example.core",             // Core-module
    "com.example.authentication",   // Authentication-module ← Ключевое!
    "com.example.objects",          // Objects-module (если есть контроллеры)
    "com.example.verification",     // Verification-module
    "com.example.notification"      // Notification-module
})
//@EnableAutoConfiguration
//@EnableWebMvc
@Configuration

@SpringBootApplication
public class GigAntApplication {

  public static void main(String[] args) {
    SpringApplication.run(GigAntApplication.class, args);
  }

}
