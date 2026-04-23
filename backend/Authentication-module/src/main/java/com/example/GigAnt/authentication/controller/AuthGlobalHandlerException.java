package com.example.GigAnt.authentication.controller;

import com.example.GigAnt.authentication.exception.AccountNotCreated;
import com.example.GigAnt.controller.GlobalExceptionHandler;
import com.example.GigAnt.core.exception.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuthGlobalHandlerException extends GlobalExceptionHandler {

  @ExceptionHandler(AccountNotCreated.class)
  public ResponseEntity<Map<String, Object>> accountNotFounded(HttpServletRequest request) {
    return buildErrorResponse(HttpStatus.BAD_REQUEST, "Не удалось создать аккаунт",
        request.getRequestURI(), request.getRequestId(), ErrorCode.ACCOUNT_NOT_CREATED);
  }
}
