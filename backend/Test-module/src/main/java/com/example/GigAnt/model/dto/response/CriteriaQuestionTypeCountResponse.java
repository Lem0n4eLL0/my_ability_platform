package com.example.GigAnt.model.dto.response;

import com.example.GigAnt.model.enums.QuestionType;

public record CriteriaQuestionTypeCountResponse(
        QuestionType questionType,
        Integer questionNumber


) {


}
