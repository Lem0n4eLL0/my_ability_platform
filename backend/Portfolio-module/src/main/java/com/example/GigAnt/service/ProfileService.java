package com.example.GigAnt.service;

import com.example.GigAnt.model.dto.request.ProfileCreateRequest;
import com.example.GigAnt.model.dto.response.ProfileResponse;
import com.example.GigAnt.model.entity.Certificates;
import com.example.GigAnt.model.entity.Education;
import com.example.GigAnt.model.entity.UserProfile;
import com.example.GigAnt.model.entity.UserProjects;
import com.example.GigAnt.model.entity.WorkExperience;
import com.example.GigAnt.repository.CertificatesRepository;
import com.example.GigAnt.repository.EducationRepository;
import com.example.GigAnt.repository.ProfileRepository;
import com.example.GigAnt.repository.UserProjectsRepository;
import com.example.GigAnt.repository.WorkExperienceRepository;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProfileService {

  private final ProfileRepository repository;
  private final CertificatesRepository certificatesRepository;
  private final EducationRepository educationRepository;
  private final UserProjectsRepository projectsRepository;
  private final WorkExperienceRepository workRepository;
  public ProfileResponse createProfile(ProfileCreateRequest request){

  }
  public ProfileResponse getProfile(UUID accountId){
    UserProfile profile = repository.getByAccountId(accountId);







  }

}
