package com.example.GigAnt.authentication.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class TokenNotFound extends BaseException {

  public TokenNotFound() {
    super("Токен не найден",
        HttpStatus.UNAUTHORIZED, ErrorCode.TOKEN_NOT_FOUND);
  }


}
