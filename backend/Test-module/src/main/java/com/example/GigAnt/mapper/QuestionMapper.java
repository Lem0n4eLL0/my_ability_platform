package com.example.GigAnt.mapper;

import com.example.GigAnt.model.dto.response.TestQuestionResponse;
import com.example.GigAnt.model.entity.Question;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    List<TestQuestionResponse> toModelList(List<Question> questions);

}
