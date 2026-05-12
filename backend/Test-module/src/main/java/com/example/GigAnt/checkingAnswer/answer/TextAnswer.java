package com.example.GigAnt.checkingAnswer.answer;

import com.example.GigAnt.model.entity.Question;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TextAnswer extends Answer {
    @NotBlank(message = "value не может быть пустым")
    private String value;

    @Override
    public int calculatePoints(Question question) {
        return question.getPoints();
    }
}
