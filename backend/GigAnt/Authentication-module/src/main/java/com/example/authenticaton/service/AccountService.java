package com.example.authenticaton.service;

import static com.example.authenticaton.service.GeneratePasswordHash.generatePasswordHash;

import com.example.authenticaton.exception.AccountNotCreated;
import com.example.authenticaton.mapper.RegisterMapper;
import com.example.authenticaton.model.dto.request.RegisterRequest;
import com.example.authenticaton.model.dto.response.RegisterResponse;
import com.example.authenticaton.model.entity.Account;
import com.example.authenticaton.repository.AccountRepository;
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
