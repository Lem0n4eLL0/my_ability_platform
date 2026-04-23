package com.example.GigAnt.authentication.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class AccountNotCreated extends BaseException {

  public AccountNotCreated() {
    super("Не удалось создать аккаунт",
        HttpStatus.BAD_REQUEST, ErrorCode.ACCOUNT_NOT_EXIST);
  }

}
