package com.example.GigAnt.service;

import com.example.GigAnt.checkingAnswer.answer.Answer;
import com.example.GigAnt.contract.ProfileApiInterface;
import com.example.GigAnt.mapper.FinishTestMapper;
import com.example.GigAnt.model.dto.response.FinishTestResponse;
import com.example.GigAnt.model.dto.response.TestResultResponse;
import com.example.GigAnt.model.entity.Question;
import com.example.GigAnt.model.entity.Test;
import com.example.GigAnt.model.entity.TestAttempts;
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
        TestAttempts testAttempts = attemptRepository.findLastAttemptByProfileAndTest(profileId,testId);
        int estimationProcent = score/testAttempts.getMaxScore();
        boolean isTestPassed = estimationProcent>test.getPassing_estimation_procent() ? true:false;
        LocalDateTime reconfirmationDate = LocalDateTime.now().plusSeconds(test.getReconfirmationTimeSeconds());
        LocalDateTime completionDate = LocalDateTime.now();
        TestResultResponse testResult = new TestResultResponse(estimationProcent,isTestPassed,reconfirmationDate,completionDate);
        return finishTestMapper.toResponse(test,testResult);


    }
    public int calculateScore(List<Answer> answers){
        return answers.stream()
                .mapToInt(answer -> {
                    Question currentQuestion = questionRepository.getReferenceById(answer.getQuestionId());
                    return answer.calculatePoints(currentQuestion);
                })
                .sum();
    }
}
