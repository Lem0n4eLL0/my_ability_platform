package com.example.GigAnt.authentication.service;

import com.example.GigAnt.authentication.config.JwtProperties;
import com.example.GigAnt.authentication.exception.AccountNotExist;
import com.example.GigAnt.authentication.exception.EmailAlreadyConfirm;
import com.example.GigAnt.authentication.exception.TokenExpiredException;
import com.example.GigAnt.authentication.exception.UnsuccessfulConfirmEmail;
import com.example.GigAnt.authentication.model.dto.request.EmailConfirmRequest;
import com.example.GigAnt.authentication.model.entity.Account;
import com.example.GigAnt.authentication.repository.AccountRepository;
import io.jsonwebtoken.ExpiredJwtException;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailVerificationService {

  private final EmailService emailService;
  private final JwtService jwtService;
  private final JwtProperties jwtProperties;
  private final JwtUtils jwtUtils;
  private final AccountRepository accountRepository;


  public void sendEmail(Account userDetails) {
    String token = jwtService.generateEmailToken(userDetails,
        jwtProperties.getEmail().getExpiration());
    SimpleMailMessage mailMessage = new SimpleMailMessage();
    mailMessage.setTo(userDetails.getEmail());
    mailMessage.setSubject("Заключительный этап регистрации!");
    mailMessage.setFrom("${MAIL}");
    mailMessage.setText("Для подтверждения вашего аккаунта перейдите по ссылке: "
        + "${API_DOMAIN}/api/${APP_VERSION}/confirm-account?token=" + token);
    emailService.sendEmail(mailMessage);
  }

  public Account confirmEmail(EmailConfirmRequest request) {
    try {
      var token = request.token();
      var claims = jwtUtils.extractAllClaims(token);
      var accountId = jwtUtils.getAccountId(claims);
      var email = jwtUtils.getEmail(claims);
      Account account = accountRepository.findByEmail(email);
      if (Objects.isNull(account)) {
        throw new AccountNotExist();
      }
      if (account.getIsVerified()) {
        log.info("Пользователь уже верифицирован");
        throw new EmailAlreadyConfirm();
      }
      if (!accountId.equals(account.getId())) {
        throw new UnsuccessfulConfirmEmail();
      }
      log.info("Пользователь подтвердил почту");
      account.setIsVerified(true);
      return account;
    } catch (ExpiredJwtException e) {
      throw new TokenExpiredException();

    }

  }

}
