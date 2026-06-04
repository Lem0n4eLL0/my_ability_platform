package com.example.GigAnt.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ProblemDetail> handleBadRequest(HttpMessageNotReadableException ex) {
        // 1. Извлекаем реальную причину ошибки (обычно это Jackson-исключение)
        Throwable cause = ex.getCause();
        String detail = cause != null ? cause.getMessage() : ex.getMessage();

        // 2. Логируем для разработчиков
        log.error("🔍 JSON Deserialization failed: {}", detail);

        // 3. Формируем ответ клиенту
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, detail);
        problem.setTitle("Invalid Request Body");
        problem.setProperty("timestamp", System.currentTimeMillis());

        return ResponseEntity.badRequest().body(problem);
    }
}