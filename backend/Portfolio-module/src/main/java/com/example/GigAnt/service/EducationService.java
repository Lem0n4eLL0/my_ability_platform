package com.example.GigAnt.service;

import com.example.GigAnt.exception.PersistenceError;
import com.example.GigAnt.exception.ProfileNotFounded;
import com.example.GigAnt.mapper.EducationMapper;
import com.example.GigAnt.model.dto.request.CertificateRequest;
import com.example.GigAnt.model.dto.request.EducationRequest;
import com.example.GigAnt.model.dto.response.EducationResponse;
import com.example.GigAnt.model.entity.Certificates;
import com.example.GigAnt.model.entity.Education;
import com.example.GigAnt.model.entity.UserProfile;
import com.example.GigAnt.repository.EducationRepository;
import com.example.GigAnt.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class EducationService {

    private final ProfileRepository profileRepository;
    private final EducationRepository educationRepository;
    private final EducationMapper mapper;

    public EducationResponse createEducation(EducationRequest request, UUID accountId){
        UserProfile profile = profileRepository.getByAccountId(accountId);
        if (Objects.isNull(profile))
            throw new ProfileNotFounded();
        Education education = mapper.toEntity(request);
        education.setProfile(profile);
        try {
            educationRepository.save(education);
        } catch (DataIntegrityViolationException e) {
            throw new PersistenceError("Education");

        }
        return mapper.toModel(education);
    }

}
