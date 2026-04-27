package com.example.GigAnt.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class PersistenceError extends BaseException {
  public PersistenceError(String message) {
    super("Ошибка сохранения данных: "+message,
        HttpStatus.BAD_REQUEST, ErrorCode.PERSISTENCE_ERROR);
  }

}
