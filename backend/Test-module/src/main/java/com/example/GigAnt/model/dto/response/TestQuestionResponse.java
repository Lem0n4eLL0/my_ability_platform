package com.example.GigAnt.model.dto.response;

import com.example.GigAnt.model.dto.external.Option;
import com.example.GigAnt.model.enums.QuestionType;

import java.util.List;
import java.util.UUID;

public record TestQuestionResponse(
        UUID id,
        int questionNumber,
        String descriptionMD,
        QuestionType type,
        List<Option> options
) {
}
