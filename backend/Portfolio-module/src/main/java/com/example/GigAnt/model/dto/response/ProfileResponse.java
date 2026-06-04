package com.example.GigAnt.model.dto.response;

import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {

  private UUID id;

  private String firstName;

  private String secondName;

  private String surnameName;

  private String birthDate;

  private String profileUniqueLink;
  private String aboutMe;

  private String contactPhone;
  private String github;

  private String email;
  private String avatarLink;
  private List<ProjectResponse> projects;
  private List<EducationResponse> educations;
  private List<WorkExperienceResponse> workExperience;
  private List<CertificateResponse> certificates;
}