package com.example.GigAnt.mapper;

import com.example.GigAnt.model.dto.response.TestsResponse;
import com.example.GigAnt.model.entity.Test;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TestMapper {

    TestsResponse toModel(Test test);

//    Test toEntity(CertificateRequest request);

    List<TestsResponse> toModelList(List<Test> certificates);

//    List<Certificates> toEntityList(List<CertificateRequest> requests);
}
