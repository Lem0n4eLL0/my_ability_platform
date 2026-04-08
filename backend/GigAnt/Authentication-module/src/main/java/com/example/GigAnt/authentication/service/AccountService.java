package com.example.GigAnt.authentication.service;

import static com.example.GigAnt.authentication.service.GeneratePasswordHash.generatePasswordHash;

import com.example.GigAnt.authentication.exception.AccountNotCreated;
import com.example.GigAnt.authentication.mapper.RegisterMapper;
import com.example.GigAnt.authentication.model.dto.request.RegisterRequest;
import com.example.GigAnt.authentication.model.dto.response.RegisterResponse;
import com.example.GigAnt.authentication.model.entity.Account;
import com.example.GigAnt.authentication.model.entity.AccountStatus;
import com.example.GigAnt.authentication.repository.AccountRepository;
import com.example.GigAnt.authentication.repository.AccountStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AccountService {

  private final AccountRepository repository;
  private final RegisterMapper mapper;
  private final AccountStatusRepository accountStatusRepository;

  public RegisterResponse registerAccount(RegisterRequest request) {
    Account account = mapper.toEntity(request);
    String hashPassword = generatePasswordHash(account.getPassword());
    account.setPassword(hashPassword);
    AccountStatus accountStatus = accountStatusRepository.save(new AccountStatus(true, false));
    ;
    account.setAccountStatus(accountStatus);
    try {
      repository.save(account);


    } catch (DataIntegrityViolationException e) {
      throw new AccountNotCreated();
    }
    return mapper.toModel(account);


  }


}
