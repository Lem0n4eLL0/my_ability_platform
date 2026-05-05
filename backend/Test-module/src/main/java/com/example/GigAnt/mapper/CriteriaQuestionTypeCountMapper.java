package com.example.GigAnt.mapper;

import com.example.GigAnt.model.dto.response.CriteriaQuestionTypeCountResponse;
import com.example.GigAnt.model.entity.CriteriaQuestionTypeCount;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CriteriaQuestionTypeCountMapper {
   CriteriaQuestionTypeCountResponse toModel(CriteriaQuestionTypeCount criteriaQuestionTypeCount);
   List<CriteriaQuestionTypeCountResponse> toModelList(List<CriteriaQuestionTypeCount> criteriaQuestionTypeCount);


}
