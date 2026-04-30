package com.example.GigAnt.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class ConcurrentModificationException extends BaseException {
  public ConcurrentModificationException(String message) {
    super("Ошибка оптимистичной блокировки для сущности: "+message,
        HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.OPTIMISTIC_BLOCK);
  }

}
