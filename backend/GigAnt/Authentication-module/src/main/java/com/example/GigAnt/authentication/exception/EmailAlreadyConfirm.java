package com.example.GigAnt.authentication.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class EmailAlreadyConfirm extends BaseException {

  public EmailAlreadyConfirm() {
    super("Почта уже подтверждена",
        HttpStatus.CONFLICT, ErrorCode.EMAIL_ALREADY_CONFIRM);
  }

}
