package com.example.GigAnt.service;

import com.example.GigAnt.contract.ProfileApiService;
import com.example.GigAnt.exception.*;
import com.example.GigAnt.factory.TestAttemptFactory;
import com.example.GigAnt.mapper.QuestionMapper;
import com.example.GigAnt.mapper.TestAttemptsMapper;
import com.example.GigAnt.model.dto.external.TestAttemptsDto;
import com.example.GigAnt.model.dto.response.TestQuestionResponse;
import com.example.GigAnt.model.entity.Question;
import com.example.GigAnt.model.entity.Test;
import com.example.GigAnt.model.entity.TestAttempts;
import com.example.GigAnt.model.enums.TestAttemptStatus;
import com.example.GigAnt.repository.QuestionRepository;
import com.example.GigAnt.repository.TestAttemptsRepository;
import com.example.GigAnt.repository.TestRepository;
import jakarta.persistence.EntityNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.lang.module.FindException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class StartTestService {

    private final TestRepository testRepository;
    private final ProfileApiService profileApiService;
    private final TestAttemptsRepository repository;
    private final TestAttemptsMapper attemptsMapper;
    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;
    private final TestAttemptFactory factory;
    private final TestAttemptValidator validator;


    public List<TestQuestionResponse> startTest(UUID testId, UUID accountId){

        log.info("Получение профиля по контракту из другого модуля Portfolio-Module");
        Integer profileId = profileApiService.getProfileIdByAccountId(accountId);
        Test test = testRepository.getReferenceById(testId);
        List<Question> questionList = findQuestions(testId);

        if(canStartTest(test,profileId)){
            saveNewAttempt(test,profileId,questionList);
        }
        return questionMapper.toModelList(questionList);

    }

    public boolean canStartTest(Test test, Integer profileId){
        TestAttempts testAttempt = repository.findLastAttemptByProfileAndTest(profileId,test.getId());
        if(Objects.isNull(testAttempt)) return true;

        TestAttemptStatus currentStatus = testAttempt.getStatus();
         return switch(currentStatus){
            case PENDING ->{
                if(validator.isExpiredTest(testAttempt,test)) throw new ExpiredTestAttempt();
                yield false;
            }
            case COMPLETED, EXPIRED -> validator.isCanStartAgain(testAttempt, test);
            default -> throw new StatusNotExist();

        };
    }

//    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveStatusExpired(TestAttempts testAttempt){
        testAttempt.setStatus(TestAttemptStatus.EXPIRED);
        repository.saveAndFlush(testAttempt);
    }
    public void saveNewAttempt(Test test,Integer profileId, List<Question> questionList){
        TestAttempts testAttempts = factory.createPending(test,profileId,questionList);
        try {
            repository.save(testAttempts);
        } catch (DataIntegrityViolationException e) {
            log.error("Data integrity violation while saving test attempt: {}", e.getMessage(), e);
            throw new PersistenceError("TestAttempts");

        }
    }
    public List<Question> findQuestions(UUID testId){
        List<Question> questionList = questionRepository.findAllQuestionsByTestIdAndByCriteries(testId);
        if(questionList.isEmpty()) throw new NotFoundedQuestions();
        return questionList;
    }


}
