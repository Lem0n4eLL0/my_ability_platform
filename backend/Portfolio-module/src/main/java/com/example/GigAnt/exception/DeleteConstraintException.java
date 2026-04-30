package com.example.GigAnt.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class DeleteConstraintException extends BaseException {
  public DeleteConstraintException(String message) {
    super("Ошибка удаления сущности, возможно остались связанные данные: "+message,
        HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.DELETE_ERROR);
  }

}
