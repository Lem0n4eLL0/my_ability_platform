package com.example.GigAnt.authentication.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class PasswordNotMatch extends BaseException {

  public PasswordNotMatch() {
    super("Пароли не совпадают!",
        HttpStatus.UNAUTHORIZED, ErrorCode.PASSWORDS_NOT_MATCH);
  }

}
