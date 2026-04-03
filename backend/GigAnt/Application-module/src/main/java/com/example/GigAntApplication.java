package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@ComponentScan(basePackages = {
    "com.example.application",      // Главный модуль
    "com.example.core",             // Core-module
    "com.example.authentication",   // Authentication-module ← Ключевое!
    "com.example.objects",          // Objects-module (если есть контроллеры)
    "com.example.verification",     // Verification-module
    "com.example.notification"      // Notification-module
})
@SpringBootApplication
public class GigAntApplication {

  public static void main(String[] args) {
    SpringApplication.run(GigAntApplication.class, args);
  }

}
