package com.example.authenticaton.exception;

import com.example.core.exception.BaseException;
import com.example.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class PasswordNotMatch extends BaseException {

  public PasswordNotMatch() {
    super("Пароли не совпадают!",
        HttpStatus.UNAUTHORIZED, ErrorCode.PASSWORDS_NOT_MATCH);
  }

}
