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
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
@Slf4j

@RequiredArgsConstructor
public class EmailVerificationService {

  private final EmailService emailService;
  private final JwtService jwtService;
  private final JwtProperties jwtProperties;
  private final JwtUtils jwtUtils;
  private final SpringTemplateEngine templateEngine;
  private final JavaMailSender mailSender;
  private final AccountRepository accountRepository;
  @Value("${spring.mail.username}")
  private String mailFrom;

  @Value("${api.domain}")
  private String apiDomain;

  @Value("${api.version}")
  private String appVersion;
  @Value("${spring.mail.password:NOT_SET}")
  private String mailPassword;



  public void sendEmail(Account userDetails) {
    String token = jwtService.generateEmailToken(
        userDetails,
        jwtProperties.getEmail().getExpiration()
    );

    String confirmationLink = apiDomain + "/api/" + appVersion +
        "/registration/confirm-email?token=" + token;
    Context context = new Context();
    context.setVariable("confirmationLink", confirmationLink);
    context.setVariable("expirationMinutes",
        jwtProperties.getEmail().getExpiration());

    String htmlContent = templateEngine.process("email/verification", context);
    try {
      MimeMessage message = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
      helper.setFrom("Gigant Verification <" + mailFrom + ">");
      helper.setTo(userDetails.getEmail());
      helper.setSubject("Подтверждение регистрации в Gigant");
      helper.setText(htmlContent, true);

      mailSender.send(message);
      log.info("Confirmation email sent to {}", userDetails.getEmail());
    } catch (MessagingException e) {
      log.error("Failed to send email to {}", userDetails.getEmail(), e);
      throw new RuntimeException("Cannot send email", e);
    }
  }

  public Account confirmEmail(String token) {
    try {
      log.info("запрос на подтверждение почты");
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
      log.info("акаунт в токене: "+accountId+" аккаунт по почте "+account.getId());
      if (!accountId.equals(account.getId().toString())) {
        throw new UnsuccessfulConfirmEmail();
      }
      log.info("Пользователь подтвердил почту");
      account.setIsVerified(true);
      accountRepository.save(account);
      return account;
    } catch (ExpiredJwtException e) {
      throw new TokenExpiredException();

    }

  }

}
