package com.example.GigAnt.exception;

import com.example.GigAnt.core.exception.BaseException;
import com.example.GigAnt.core.exception.ErrorCode;
import com.example.GigAnt.entity.BaseEntity;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class NotEnoughPassTimeTest extends BaseException {
    public NotEnoughPassTimeTest(LocalDateTime nextAttemptData){
        super("Вы уже проходили этот тест. Следующая попытка "+nextAttemptData,
                HttpStatus.TOO_MANY_REQUESTS, ErrorCode.TEST_ALREADY_PASS);
    }
}
