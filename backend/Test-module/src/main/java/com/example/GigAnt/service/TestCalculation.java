package com.example.GigAnt.service;

import com.example.GigAnt.checkingAnswer.answer.Answer;
import com.example.GigAnt.model.dto.response.TestResultResponse;
import com.example.GigAnt.model.entity.Question;
import com.example.GigAnt.model.entity.Test;
import com.example.GigAnt.model.entity.TestAttempts;
import com.example.GigAnt.repository.QuestionRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@RequiredArgsConstructor
@Slf4j
@Component
public class TestCalculation {


    public static TestResultResponse calculate(List<Answer> answers, TestAttempts attempt,
                                               Test test, QuestionRepository questionRepository) {
        int score = calculateScore(answers, questionRepository);
        int percent = calculatePercent(score, attempt.getMaxScore());
        log.info("Процент прохождения теста пользователем "+percent);
        log.info("сколько надо пройти "+test.getPassing_estimation_procent());
        boolean flag = percent >= test.getPassing_estimation_procent();
        log.info("пройден тест? "+flag);

        return new TestResultResponse(
                attempt.getId(),
                score,
                percent,
                percent >= test.getPassing_estimation_procent(),
                LocalDateTime.now().plusSeconds(test.getReconfirmationTimeSeconds()),
                LocalDateTime.now()
        );
    }

    private static int calculateScore(List<Answer> answers, QuestionRepository questionRepository) {
        return answers.stream()
                .mapToInt(answer -> {
                    Question currentQuestion = questionRepository.getReferenceById(answer.getQuestionId());
                    log.info("считаем каждый вопрос ");
                    int score = answer.calculatePoints(currentQuestion);
                    log.info("сколько итого за вопрос " + score);
                    return score;
                })
                .sum();
    }

    private static int calculatePercent(int score, int maxScore) {
        if (maxScore == 0) return 0;
        return (int) Math.round(score * 100.0 / maxScore);
    }
}