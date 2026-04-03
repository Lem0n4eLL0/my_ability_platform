package com.example.authentication.exception;

import com.example.core.exception.BaseException;
import com.example.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class TokenExpiredException extends BaseException {

  public TokenExpiredException() {
    super("Токен просрочен",
        HttpStatus.UNAUTHORIZED, ErrorCode.TOKEN_EXPIRED);
  }

}
