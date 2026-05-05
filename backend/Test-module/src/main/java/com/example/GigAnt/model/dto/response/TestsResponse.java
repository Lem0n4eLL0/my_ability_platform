package com.example.GigAnt.model.dto.response;

import com.example.GigAnt.model.dto.external.QuestionTypeQuantity;
import com.example.GigAnt.model.entity.Test;
import com.example.GigAnt.model.enums.Difficulty;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public record TestsResponse(
        UUID id,
        String title,
        String description,
        Difficulty difficulty,
        Integer timeLimitSeconds,
        Integer rechargeTimeSeconds,
        Integer reconfirmationTimeSeconds,
        List<CriteriaQuestionTypeCountResponse> criteriaQuestionTypeCountResponseList

) {
    public static TestsResponse of(Test test, List<CriteriaQuestionTypeCountResponse> criteriaQuestionTypeCountResponseList) {
        return new TestsResponse(
                test.getId(),
                test.getTitle(),
                test.getDescription(),
                test.getDifficulty(),
                test.getTimeLimitSeconds(),
                test.getRechargeTime(),
                test.getReconfirmationTimeSeconds(),
                criteriaQuestionTypeCountResponseList != null ?
                        new ArrayList<>(criteriaQuestionTypeCountResponseList) :
                        new ArrayList<>()
        );
    }
}

