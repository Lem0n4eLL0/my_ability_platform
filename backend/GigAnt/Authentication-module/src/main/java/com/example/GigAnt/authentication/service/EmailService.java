package com.example.GigAnt.authentication.service;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service("emailSenderService")
public class EmailService {

  private JavaMailSender javaMailSender;
  private final JwtService jwtService;

  @Async
  public void sendEmail(SimpleMailMessage email) {
    javaMailSender.send(email);
  }

}