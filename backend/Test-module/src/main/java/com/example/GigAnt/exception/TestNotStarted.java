package com.example.GigAnt.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class TestNotStarted extends BaseException {
    public TestNotStarted() {
        super("Тест еще не начат ",
                HttpStatus.CONFLICT, ErrorCode.TEST_NOT_START);
    }
}
