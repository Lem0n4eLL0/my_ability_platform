package com.example.GigAnt.checkingAnswer.answer;

import com.example.GigAnt.model.entity.Question;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OptionAnswer extends Answer {
    @NotBlank(message = "answerId не может быть пустым")
    private String answerId;

    @Override
    public int calculatePoints(Question question) {
        if(!answerId.equals(question.getCorrectAnswer().get(0))) return 0;
        return question.getPoints();
    }
}