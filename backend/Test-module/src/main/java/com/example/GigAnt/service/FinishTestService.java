package com.example.GigAnt.service;

import com.example.GigAnt.checkingAnswer.answer.Answer;
import com.example.GigAnt.contract.ProfileApiInterface;
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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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

    public FinishTestResponse finishTest(UUID testId, UUID accountId, List<Answer> answers){

        Integer profileId = profileApi.getProfileIdByAccountId(accountId);
        Test test = testRepository.getReferenceById(testId);
        int score = calculateScore(answers);
        log.info("У пользователя за весь тест  "+score);
        TestAttempts testAttempts = attemptRepository.findLastAttemptByProfileAndTest(profileId,testId);
        int estimationProcent = (int) (score * 100.0 / testAttempts.getMaxScore());
        log.info("Максимальный балл "+testAttempts.getMaxScore());
        log.info("Процент прохождения "+estimationProcent);
        boolean isTestPassed = estimationProcent>test.getPassing_estimation_procent();
        LocalDateTime reconfirmationDate = LocalDateTime.now().plusSeconds(test.getReconfirmationTimeSeconds());
        LocalDateTime completionDate = LocalDateTime.now();
        TestResultResponse testResult = new TestResultResponse(estimationProcent,isTestPassed,reconfirmationDate,completionDate);

        testAttempts.setEstimationProcent(estimationProcent);
        testAttempts.setStatus(TestAttemptStatus.COMPLETED);
        testAttempts.setScore(score);
        testAttempts.setFinishedAt(completionDate);
        attemptRepository.save(testAttempts);
        return finishTestMapper.toResponse(test,testResult);


    }
    public int calculateScore(List<Answer> answers){
        return answers.stream()
                .mapToInt(answer -> {
                    Question currentQuestion = questionRepository.getReferenceById(answer.getQuestionId());
                    log.info("считаем каждый вопрос ");
                    int score = answer.calculatePoints(currentQuestion);
                    log.info("сколько итого за вопрос "+ score);
                    return score;
                })
                .sum();
    }
}
