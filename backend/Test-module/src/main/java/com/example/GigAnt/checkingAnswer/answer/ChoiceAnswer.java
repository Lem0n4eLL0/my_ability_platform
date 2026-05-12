package com.example.GigAnt.checkingAnswer.answer;

import com.example.GigAnt.model.dto.external.CorrectAnswer;
import com.example.GigAnt.model.entity.Question;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class ChoiceAnswer extends Answer {
    @NotNull(message = "answerIds не может быть null")
    private List<CorrectAnswer> answerIds;

    @Override
    public int calculatePoints(Question question) {
        Set<CorrectAnswer> userAnswers = new HashSet<>(answerIds);
        Set<CorrectAnswer> correctAnswers = new HashSet<>(question.getCorrectAnswer());
        Set<CorrectAnswer> commonAnswers = new HashSet<>(userAnswers);
        commonAnswers.retainAll(correctAnswers);
        int countCorrectAnswer = commonAnswers.size();
        int countWrongAnswer = correctAnswers.size()-countCorrectAnswer;
        float coefficient = question.getPoints()/correctAnswers.size();
        float score = countCorrectAnswer*coefficient-countWrongAnswer*coefficient;
        if(score<=0) return 0;
        return (int) Math.round(score);
    }
}