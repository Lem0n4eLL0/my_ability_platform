package com.example.GigAnt.service;

import com.example.GigAnt.checkingAnswer.answer.Answer;
import com.example.GigAnt.contract.ProfileApiInterface;
import com.example.GigAnt.exception.ExpiredTestAttempt;
import com.example.GigAnt.exception.TestNotStarted;
import com.example.GigAnt.mapper.FinishTestMapper;
import com.example.GigAnt.model.dto.response.FinishTestResponse;
import com.example.GigAnt.model.dto.response.TestResultResponse;
import com.example.GigAnt.model.entity.Question;
import com.example.GigAnt.model.entity.Test;
import com.example.GigAnt.model.entity.TestAttempts;
import com.example.GigAnt.model.enums.TestAttemptStatus;
import com.example.GigAnt.repository.QuestionRepository;
import com.example.GigAnt.repository.TestAttemptsRepository;
import com.example.GigAnt.repository.TestRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class FinishTestService {
    private final ProfileApiInterface profileApi;
    private final TestRepository testRepository;
    private final TestAttemptsRepository attemptRepository;
    private final QuestionRepository questionRepository;
    private final FinishTestMapper finishTestMapper;
    private final TestAttemptValidator validator;
    private final TestCalculation testCalculation;

    public FinishTestResponse finishTest(UUID testId, UUID accountId, List<Answer> answers){

        UUID profileId = profileApi.getProfileIdByAccountId(accountId);
        Test test = testRepository.getReferenceById(testId);

        TestAttempts testAttempts = attemptRepository.findLastAttemptByProfileAndTest(profileId,testId);
        validateAttempt(testAttempts,test);


        TestResultResponse testResult = TestCalculation.calculate(answers,testAttempts,test,questionRepository);

        updateTestAttempt(testAttempts,testResult);
        attemptRepository.save(testAttempts);

        return finishTestMapper.toResponse(test,testResult);


    }


    public void validateAttempt(TestAttempts testAttempts, Test test){
        if(Objects.isNull(testAttempts)){
            throw new TestNotStarted();
        }
        if(validator.isExpiredTest(testAttempts,test)){
            throw new ExpiredTestAttempt();
        }
    }
    public void updateTestAttempt(TestAttempts testAttempts,TestResultResponse testResult){
        testAttempts.setEstimationProcent(testResult.estimationProcent());
        testAttempts.setStatus(TestAttemptStatus.COMPLETED);
        testAttempts.setPassingTest(testResult.passingTest());
        testAttempts.setScore(testResult.score());
        testAttempts.setFinishedAt(testResult.completionDate());
        testAttempts.setReconfirmationDate(testResult.reconfirmationDate());
    }
}
