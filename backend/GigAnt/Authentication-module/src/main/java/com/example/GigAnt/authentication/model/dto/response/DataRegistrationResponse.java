package com.example.GigAnt.authentication.model.dto.response;

import java.util.List;

public record DataRegistrationResponse(
    Integer id,
    String firstName,
    String secondName,
    String surname,
    String birthday,
    String aboutMyself,
    String contactPhone,
    String github,
    String email,
    String avatarLink,
    List<ProjectResponse> projects,
    List<EducationResponse> educations,
    List<WorkExpirienceResponse> workExperience,
    List<CertificateResponse> certificates
) {

}
