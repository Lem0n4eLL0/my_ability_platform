package com.example.GigAnt.checkingAnswer.answer;

import com.example.GigAnt.model.entity.Question;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CodeAnswer extends Answer {
    @NotBlank(message = "code не может быть пустым")
    private String code;

    @Override
    public int calculatePoints(Question question) {
        return question.getPoints();
    }
}