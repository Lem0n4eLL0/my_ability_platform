package com.example.GigAnt.authentication.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class UnsuccessfulConfirmEmail extends BaseException {

  public UnsuccessfulConfirmEmail() {
    super("Не удалось подтвердить почту",
        HttpStatus.BAD_REQUEST, ErrorCode.UNSUCCESSFUL_CONFIRM_EMAIL);
  }
}
