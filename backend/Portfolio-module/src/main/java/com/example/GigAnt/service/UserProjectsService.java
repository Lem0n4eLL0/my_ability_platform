package com.example.GigAnt.service;

import com.example.GigAnt.exception.PersistenceError;
import com.example.GigAnt.exception.ProfileNotFounded;
import com.example.GigAnt.mapper.EducationMapper;
import com.example.GigAnt.mapper.UserProjectMapper;
import com.example.GigAnt.model.dto.request.EducationRequest;
import com.example.GigAnt.model.dto.request.ProjectsRequest;
import com.example.GigAnt.model.dto.response.EducationResponse;
import com.example.GigAnt.model.dto.response.ProjectResponse;
import com.example.GigAnt.model.entity.Education;
import com.example.GigAnt.model.entity.UserProfile;
import com.example.GigAnt.model.entity.UserProjects;
import com.example.GigAnt.repository.EducationRepository;
import com.example.GigAnt.repository.ProfileRepository;
import com.example.GigAnt.repository.UserProjectsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserProjectsService {

    private final ProfileRepository profileRepository;
    private final UserProjectsRepository userProjectsRepository;
    private final UserProjectMapper mapper;

    public ProjectResponse createProject(ProjectsRequest request, UUID accountId){
        UserProfile profile = profileRepository.getByAccountId(accountId);
        if (Objects.isNull(profile))
            throw new ProfileNotFounded();
        UserProjects userProjects = mapper.toEntity(request);
        userProjects.setProfile(profile);
        try {
            userProjectsRepository.save(userProjects);
        } catch (DataIntegrityViolationException e) {
            throw new PersistenceError("UserProject");

        }
        return mapper.toModel(userProjects);
    }
}
