package com.example.GigAnt.checkingAnswer.answer;

import com.example.GigAnt.model.entity.Question;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class TextAnswer extends Answer {
    @NotBlank(message = "value не может быть пустым")
    private String value;

    @Override
    public int calculatePoints(Question question) {
        log.info("Вопрос с текстом можно получить "+question.getPoints());
        return question.getPoints();
    }
}
