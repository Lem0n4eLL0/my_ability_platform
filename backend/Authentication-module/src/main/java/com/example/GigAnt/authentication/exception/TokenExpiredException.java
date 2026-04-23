package com.example.GigAnt.authentication.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class TokenExpiredException extends BaseException {

  public TokenExpiredException() {
    super("Токен просрочен",
        HttpStatus.UNAUTHORIZED, ErrorCode.TOKEN_EXPIRED);
  }

}
