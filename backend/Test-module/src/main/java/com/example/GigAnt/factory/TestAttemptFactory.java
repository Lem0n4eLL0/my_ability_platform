package com.example.GigAnt.factory;

import com.example.GigAnt.model.entity.Question;
import com.example.GigAnt.model.entity.Test;
import com.example.GigAnt.model.entity.TestAttempts;
import com.example.GigAnt.model.enums.TestAttemptStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TestAttemptFactory {



    public TestAttempts createPending(Test test, Integer profileId, List<Question> questions) {
        return TestAttempts.builder()
                .test(test)
                .profileId(profileId)
                .status(TestAttemptStatus.PENDING)
                .score(0)
                .maxScore(calculateMaxScore(questions))
                .estimationProcent(0)
                .startedAt(LocalDateTime.now())
                .build();
    }

    public TestAttempts createCompleted(Test test, Integer profileId, int score, int maxScore) {
        return TestAttempts.builder()
                .test(test)
                .profileId(profileId)
                .status(TestAttemptStatus.COMPLETED)
                .score(score)
                .maxScore(maxScore)
                .estimationProcent(calculatePercent(score, maxScore))
                .startedAt(LocalDateTime.now())
                .finishedAt(LocalDateTime.now())
                .build();
    }

    private int calculateMaxScore(List<Question> questions) {
        return questions.stream().mapToInt(Question::getPoints).sum();
    }

    private int calculatePercent(int score, int max) {
        return max > 0 ? (int) Math.round((double) score / max * 100) : 0;
    }
}