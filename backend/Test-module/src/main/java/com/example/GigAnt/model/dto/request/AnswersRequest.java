package com.example.GigAnt.model.dto.request;

import com.example.GigAnt.checkingAnswer.answer.Answer;
import com.example.GigAnt.model.enums.QuestionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
public class AnswersRequest {
    @NotBlank(message = "questionId обязателен")
    private String questionId;

    @NotNull(message = "type обязателен")
    private QuestionType type;
    private Answer answer;
}
