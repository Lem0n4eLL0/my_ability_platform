package com.example.GigAnt.checkingAnswer.answer;

import com.example.GigAnt.model.entity.Question;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class OptionAnswer extends Answer {
    @NotBlank(message = "answerId не может быть пустым")
    private String answerId;

    @Override
    public int calculatePoints(Question question) {
        log.info("Вопрос с одним ответом: \n" +
                "Ответ пользователя "+answerId+"\n"+
        "Правильный ответ "+question.getCorrectAnswer().get(0));
        if(!answerId.equals(question.getCorrectAnswer().get(0).id())) {
            log.info("Не верный одиночный ответ ");
            return 0;
        }
        log.info("Пользователь правильно ответил на одиночный вопрос и получает "+question.getPoints());
        return question.getPoints();
    }
}