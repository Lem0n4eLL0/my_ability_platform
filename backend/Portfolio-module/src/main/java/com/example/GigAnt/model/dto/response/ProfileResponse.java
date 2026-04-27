package com.example.GigAnt.model.dto.response;

import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {
  @NotNull
  private Integer id;
  @NotNull
  private String firstName;
  @NotNull
  private String secondName;

  private String surname;
  @NotNull
  private String birthday;
  @NotNull
  private String profileUniqueLink;
  @NotNull
  private String aboutMyself;
  @NotNull
  private String contactPhone;
  private String github;
  @NotNull
  private String email;
  private String avatarLink;
  private List<ProjectResponse> projects;
  private List<EducationResponse> educations;
  private List<WorkExperienceResponse> workExperience;
  private List<CertificateResponse> certificates;
}