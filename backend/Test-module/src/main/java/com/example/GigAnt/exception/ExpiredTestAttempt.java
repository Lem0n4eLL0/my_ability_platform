package com.example.GigAnt.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class ExpiredTestAttempt extends BaseException {
    public ExpiredTestAttempt(){
        super("Просрочена попытка теста",
                HttpStatus.CONFLICT, ErrorCode.EXPIRED_TEST);
    }
}
