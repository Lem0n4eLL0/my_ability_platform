package com.example.GigAnt.authentication.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class AccountNotExist extends BaseException {

  public AccountNotExist() {
    super("Аккаунта с этой почтой не существует! Перейдите на страницу регистрации",
        HttpStatus.CONFLICT, ErrorCode.ACCOUNT_NOT_EXIST);
  }

}
