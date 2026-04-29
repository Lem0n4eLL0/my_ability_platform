package com.example.GigAnt.mapper;

import com.example.GigAnt.model.dto.request.ProfileCreateRequest;
import com.example.GigAnt.model.dto.request.ProfileUpdateRequest;
import com.example.GigAnt.model.dto.response.ProfileResponse;
import com.example.GigAnt.model.entity.UserProfile;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    uses = {
        CertificateMapper.class,
        EducationMapper.class,
        UserProjectMapper.class,
        WorkExperienceMapper.class
    }
)
public interface ProfileMapper {
  UserProfile toEntity(ProfileCreateRequest request);
  ProfileResponse toModel(UserProfile userProfile);
  void updateEntityFromRequest(ProfileUpdateRequest source, @MappingTarget UserProfile target);


}
