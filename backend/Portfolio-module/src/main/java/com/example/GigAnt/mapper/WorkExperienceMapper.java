package com.example.GigAnt.mapper;
import com.example.GigAnt.model.dto.request.WorkEducationRequest;
import com.example.GigAnt.model.dto.response.WorkExperienceResponse;
import com.example.GigAnt.model.entity.WorkExperience;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import java.time.LocalDate;
import java.util.List;

@Mapper(componentModel = "spring")
public interface WorkExperienceMapper {

  WorkExperience toEntity(WorkEducationRequest request);


  WorkExperienceResponse toModel(WorkExperience workExperience);

  List<WorkExperienceResponse> toModelList(List<WorkExperience> workExperiences);

  List<WorkExperience> toEntityList(List<WorkEducationRequest> requests);


}