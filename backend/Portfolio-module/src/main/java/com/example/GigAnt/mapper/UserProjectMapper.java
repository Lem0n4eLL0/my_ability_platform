package com.example.GigAnt.mapper;

import com.example.GigAnt.authentication.enums.AccountRole;
import com.example.GigAnt.authentication.model.dto.request.RegisterRequest;
import com.example.GigAnt.authentication.model.dto.response.RegisterResponse;
import com.example.GigAnt.authentication.model.entity.Account;
import com.example.GigAnt.model.dto.request.ProjectsRequest;
import com.example.GigAnt.model.dto.response.ProjectResponse;
import com.example.GigAnt.model.entity.UserProjects;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
@Mapper(componentModel = "spring")
public interface UserProjectMapper {
  UserProjects toEntity(ProjectsRequest request);
  ProjectResponse toModel(UserProjects userProjects);
  List<UserProjects> toEntityList(List<ProjectsRequest> projectsRequests);
  List<ProjectResponse> toModelList(UserProjects userProjects);



}



