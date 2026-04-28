package com.example.GigAnt.mapper;

import com.example.GigAnt.model.dto.request.EducationRequest;
import com.example.GigAnt.model.dto.response.EducationResponse;
import com.example.GigAnt.model.entity.Education;
import com.example.GigAnt.model.enums.EducationStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import java.util.List;

@Mapper(componentModel = "spring")
public interface EducationMapper {

  Education toEntity(EducationRequest request);

  EducationResponse toModel(Education education);

  List<EducationResponse> toModelList(List<Education> educations);

  List<Education> toEntityList(List<EducationRequest> requests);


}