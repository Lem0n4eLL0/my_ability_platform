package com.example.GigAnt.authentication.service;

import static com.example.GigAnt.authentication.service.GeneratePasswordHash.isMatches;

import com.example.GigAnt.authentication.exception.AccountNotExist;
import com.example.GigAnt.authentication.exception.PasswordNotMatch;
import com.example.GigAnt.authentication.model.dto.Tokens;
import com.example.GigAnt.authentication.model.dto.request.AccountRequest;
import com.example.GigAnt.authentication.model.entity.Account;
import com.example.GigAnt.authentication.repository.AccountRepository;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class AuthenticationService {

  private final AccountRepository repository;
  private final RefreshTokenService refreshTokenService;
  private final JwtService jwtService;
  private final JwtUtils jwtUtils;

  public Account authenticate(AccountRequest request) {

    Account account = repository.findByEmail(request.email());
    if (Objects.isNull(account)) {
      throw new AccountNotExist();
    }
    if (!isMatches(account.getPassword(), request.password())) {
      throw new PasswordNotMatch();
    }
    return account;

  }

  public Tokens getTokens(Account account) {
    return Tokens.builder()
        .token(jwtService.generateAccessToken(account))
        .refreshToken(refreshTokenService.createRefreshToken(account))
        .build();
  }

  public Tokens refreshToken(String refreshToken) {
    log.debug("Token refresh request");

    var token = refreshTokenService.verifyRefreshToken(refreshToken);
    var claims = jwtUtils.extractAllClaims(refreshToken);
    var user = new Account();
    user.setId(UUID.fromString(jwtUtils.getAccountId(claims)));

    var jwtToken = jwtService.generateAccessToken(user);
    var newRefreshToken = refreshTokenService.rotateRefreshToken(token, user);

    log.debug("Tokens successfully refreshed for user: {}", user.getEmail());

    return Tokens.builder()
        .token(jwtToken)
        .refreshToken(newRefreshToken)
        .build();
  }

}
