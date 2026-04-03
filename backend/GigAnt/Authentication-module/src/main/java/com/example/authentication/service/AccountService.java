package com.example.authentication.service;

import static com.example.authentication.service.GeneratePasswordHash.generatePasswordHash;

import com.example.authentication.exception.AccountNotCreated;
import com.example.authentication.mapper.RegisterMapper;
import com.example.authentication.model.dto.request.RegisterRequest;
import com.example.authentication.model.dto.response.RegisterResponse;
import com.example.authentication.model.entity.Account;
import com.example.authentication.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AccountService {

  private final AccountRepository repository;
  private final RegisterMapper mapper;

  public RegisterResponse registerAccount(RegisterRequest request) {
    Account account = mapper.toEntity(request);
    String hashPassword = generatePasswordHash(account.getPassword());
    account.setPassword(hashPassword);
    try {
      repository.save(account);
    } catch (DataIntegrityViolationException e) {
      throw new AccountNotCreated();
    }
    return mapper.toModel(account);


  }


}
