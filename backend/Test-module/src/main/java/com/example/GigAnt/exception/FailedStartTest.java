package com.example.GigAnt.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class FailedStartTest extends BaseException {
    public FailedStartTest() {
        super("Не удалось начать тест ",
                HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.FAILED_START_TEST);
    }
}
