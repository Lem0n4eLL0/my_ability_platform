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

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "profile", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "version", ignore = true)
  @Mapping(source = "status", target = "status", qualifiedByName = "educationStatusToString")
  Education toEntity(EducationRequest request);

  @Mapping(source = "status", target = "status", qualifiedByName = "stringToEducationStatus")
  @Mapping(source = "graduationDate", target = "graduationDate", qualifiedByName = "localDateToString")
  EducationResponse toModel(Education education);

  List<EducationResponse> toModelList(List<Education> educations);

  List<Education> toEntityList(List<EducationRequest> requests);


}