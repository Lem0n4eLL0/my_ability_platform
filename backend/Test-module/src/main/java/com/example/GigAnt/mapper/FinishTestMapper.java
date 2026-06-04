package com.example.GigAnt.mapper;

import com.example.GigAnt.model.dto.response.FinishTestResponse;
import com.example.GigAnt.model.dto.response.TestResultResponse;
import com.example.GigAnt.model.entity.Test;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FinishTestMapper {
    FinishTestResponse toResponse(Test test, TestResultResponse testResultResponse);
}
