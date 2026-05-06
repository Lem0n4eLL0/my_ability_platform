package com.example.GigAnt.mapper;

import com.example.GigAnt.model.dto.external.TestAttemptsDto;
import com.example.GigAnt.model.entity.TestAttempts;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TestAttemptsMapper {
    TestAttempts toEntity(TestAttemptsDto dto);
}
