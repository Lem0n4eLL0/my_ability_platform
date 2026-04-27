package com.example.GigAnt.mapper;

import com.example.GigAnt.model.dto.request.ProfileCreateRequest;
import com.example.GigAnt.model.dto.response.ProfileResponse;
import com.example.GigAnt.model.entity.UserProfile;
import org.mapstruct.Mapper;

@Mapper(
    componentModel = "spring",
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


}
