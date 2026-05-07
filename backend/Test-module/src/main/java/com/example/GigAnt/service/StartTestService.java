package com.example.GigAnt.service;

import com.example.GigAnt.contract.ProfileApiService;
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

import java.lang.module.FindException;
import java.time.LocalDateTime;
import java.util.List;
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


    public List<TestQuestionResponse> startTest(UUID testId, UUID accountId){
        log.info("Получение профиля по контракту из другого модуля Portfolio-Module");
        Integer profileId = profileApiService.getProfileIdByAccountId(accountId);
        log.info("Полученный профиль: "+profileId);
        log.info("Получение теста из бд");
        Test test = testRepository.getReferenceById(testId);
        List<Question> questionList = questionRepository.findAllQuestionsByTestIdAndByCriteries(testId);

        TestAttemptsDto testAttemptsDto = new TestAttemptsDto(profileId, TestAttemptStatus.PENDING,0,0,0,LocalDateTime.now());
        TestAttempts testAttempts = attemptsMapper.toEntity(testAttemptsDto);
        testAttempts.setTest(test);
        try {
            repository.save(testAttempts);
        } catch (DataIntegrityViolationException e) {
            log.error("Data integrity violation while saving test attempt: {}", e.getMessage(), e);

            if (e.getMessage().contains("profile_id")) {
                throw new EntityNotFoundException("Profile with id " + profileId + " does not exist");
            }
            if (e.getMessage().contains("test_id")) {
                throw new EntityNotFoundException("Test with id " + testId + " does not exist");
            }
            throw new RuntimeException("Failed to save test attempt due to data integrity violation", e);
        }
        return questionMapper.toModelList(questionList);



    }

}
