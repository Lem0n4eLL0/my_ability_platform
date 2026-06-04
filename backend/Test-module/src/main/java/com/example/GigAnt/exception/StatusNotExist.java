package com.example.GigAnt.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public class StatusNotExist extends BaseException {
    public StatusNotExist() {
        super("Такого статуса не существует ",
                HttpStatus.NOT_FOUND, ErrorCode.STATUS_NOT_FOUND);
    }
}
