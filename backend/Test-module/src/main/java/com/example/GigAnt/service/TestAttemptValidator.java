package com.example.GigAnt.service;

import com.example.GigAnt.exception.ExpiredTestAttempt;
import com.example.GigAnt.exception.NotEnoughPassTimeTest;
import com.example.GigAnt.model.entity.Test;
import com.example.GigAnt.model.entity.TestAttempts;
import com.example.GigAnt.model.enums.TestAttemptStatus;
import com.example.GigAnt.repository.TestAttemptsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class TestAttemptValidator
{
    private final TestAttemptsRepository repository;

    @Transactional(noRollbackFor = ExpiredTestAttempt.class)
    public boolean isExpiredTest(TestAttempts testAttempt, Test test){
        LocalDateTime timeExpiredTest = testAttempt.getStartedAt().plusSeconds(test.getTimeLimitSeconds());
        if(LocalDateTime.now().isAfter(timeExpiredTest)){
            testAttempt.setStatus(TestAttemptStatus.EXPIRED);
            repository.saveAndFlush(testAttempt);
            return true;
        }
        return false;

    }


    public boolean isCanStartAgain(TestAttempts testAttempt, Test test){
        LocalDateTime finishedAt = (testAttempt.getFinishedAt()!=null) ? testAttempt.getFinishedAt():testAttempt.getStartedAt();
        LocalDateTime timeRepassing = finishedAt.plusSeconds(test.getReconfirmationTimeSeconds());
        if(LocalDateTime.now().isBefore(timeRepassing)){
            throw new NotEnoughPassTimeTest(timeRepassing);
        }
        return true;


    }
}
