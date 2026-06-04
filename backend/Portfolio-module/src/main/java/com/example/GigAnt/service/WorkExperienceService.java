package com.example.GigAnt.service;

import com.example.GigAnt.exception.PersistenceError;
import com.example.GigAnt.exception.ProfileNotFounded;
import com.example.GigAnt.mapper.EducationMapper;
import com.example.GigAnt.mapper.WorkExperienceMapper;
import com.example.GigAnt.model.dto.request.EducationRequest;
import com.example.GigAnt.model.dto.request.WorkExperienceRequest;
import com.example.GigAnt.model.dto.response.EducationResponse;
import com.example.GigAnt.model.dto.response.WorkExperienceResponse;
import com.example.GigAnt.model.entity.Education;
import com.example.GigAnt.model.entity.UserProfile;
import com.example.GigAnt.model.entity.WorkExperience;
import com.example.GigAnt.repository.EducationRepository;
import com.example.GigAnt.repository.ProfileRepository;
import com.example.GigAnt.repository.WorkExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;
@RequiredArgsConstructor
@Service
public class WorkExperienceService {
    private final ProfileRepository profileRepository;
    private final WorkExperienceRepository workExperienceRepository;
    private final WorkExperienceMapper mapper;

    public WorkExperienceResponse createWorkExperience(WorkExperienceRequest request, UUID accountId){
        UserProfile profile = profileRepository.getByAccountId(accountId);
        if (Objects.isNull(profile))
            throw new ProfileNotFounded();
        WorkExperience workExperience = mapper.toEntity(request);
        workExperience.setProfile(profile);
        try {
            workExperienceRepository.save(workExperience);
        } catch (DataIntegrityViolationException e) {
            throw new PersistenceError("WorkExperience");

        }
        return mapper.toModel(workExperience);
    }
}
