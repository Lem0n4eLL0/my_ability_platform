package com.example.GigAnt.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class NotFoundedQuestions extends BaseException {
    public NotFoundedQuestions() {
        super("Не удалось найти вопросы ",
                HttpStatus.NOT_FOUND, ErrorCode.QUESTIONS_NOT_FOUND);
    }
}
