package com.example.GigAnt.model.dto.response;

import com.example.GigAnt.model.dto.external.QuestionTypeQuantity;
import com.example.GigAnt.model.enums.Difficulty;

import java.time.Duration;
import java.util.UUID;

public record TestsResponse(
        UUID id,
        String title,
        String description,
        int rate,
        String imgURL,
        Difficulty difficulty,
        Integer timeLimitSeconds,
        Integer rechargeTimeSeconds,
        Integer reconfirmationTimeSeconds
//        QuestionTypeQuantity questionsTypesQuantity
) {
}
