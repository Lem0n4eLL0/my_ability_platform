package com.example.GigAnt.checkingAnswer.answer;

import com.example.GigAnt.model.enums.QuestionType;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = OptionAnswer.class, name = "OPTION"),
        @JsonSubTypes.Type(value = ChoiceAnswer.class, name = "CHOICE"),
        @JsonSubTypes.Type(value = TextAnswer.class, name = "TEXT"),
        @JsonSubTypes.Type(value = CodeAnswer.class, name = "CODE")
})
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public abstract class Answer implements StrategyCheck {
    UUID questionId;
    QuestionType type;
}