package com.example.GigAnt.authentication.model.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DataRegistrationResponse {

  private Integer id;
  
  private String firstName;
  private String secondName;
  private String surname;
  private String birthday;
  private String aboutMyself;
  private String contactPhone;
  private String github;
  private String email;
  private String avatarLink;
  private List<ProjectResponse> projects;
  private List<EducationResponse> educations;
  private List<WorkExpirienceResponse> workExperience;
  private List<CertificateResponse> certificates;
}