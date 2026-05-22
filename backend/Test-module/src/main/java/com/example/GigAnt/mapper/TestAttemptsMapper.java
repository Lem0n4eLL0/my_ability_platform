package com.example.GigAnt.mapper;

import com.example.GigAnt.model.dto.external.TestAttemptsDto;
import com.example.GigAnt.model.dto.response.TestResultResponse;
import com.example.GigAnt.model.entity.TestAttempts;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TestAttemptsMapper {
    TestAttempts toEntity(TestAttemptsDto dto);
    @Mapping(target = "isPassingTest", source = "isPassingTest")
    List<TestResultResponse> toModelList(List<TestAttempts> testAttemptsList);
}
