package com.example.GigAnt.checkingAnswer.answer;

import com.example.GigAnt.model.dto.external.CorrectAnswer;
import com.example.GigAnt.model.entity.Question;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Slf4j
public class ChoiceAnswer extends Answer {
    @NotNull(message = "answerIds не может быть null")
    private List<String> answerIds;

    @Override
    public int calculatePoints(Question question) {
        Set<String> userAnswerIds = new HashSet<>(answerIds);
        log.info("Ответы пользователя: "+userAnswerIds.toString());

        Set<String> correctAnswerIds = question.getCorrectAnswer().stream()
                .map(ca -> ca.id())
                .collect(Collectors.toSet());


        Set<String> commonIds = new HashSet<>(userAnswerIds);

        commonIds.retainAll(correctAnswerIds);
        int correctCount = commonIds.size();
        int wrongCount = userAnswerIds.size() - correctCount;
        int totalCorrect = correctAnswerIds.size();

        if (correctCount == 0)  return 0;

        float coefficient = (float) question.getPoints() / totalCorrect;

        float score = (correctCount * coefficient) - (wrongCount * coefficient);
        log.info("Итого за вопрос : "+score);

        return score <= 0 ? 0 : Math.round(score);
    }
}