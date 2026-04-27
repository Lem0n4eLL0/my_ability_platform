package com.example.GigAnt.service;

import com.example.GigAnt.authentication.model.entity.Account;
import com.example.GigAnt.exception.ConcurrentModificationException;
import com.example.GigAnt.exception.DeleteConstraintException;
import com.example.GigAnt.exception.PersistenceError;
import com.example.GigAnt.exception.ProfileNotFounded;
import com.example.GigAnt.mapper.ProfileMapper;
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
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProfileService {

  private final ProfileRepository repository;
  private final ProfileMapper mapper;
  private final EntityManager entityManager;

  public ProfileResponse createProfile(ProfileCreateRequest request, UUID accountId){
    UserProfile profile = mapper.toEntity(request);
    Account accountRef = entityManager.getReference(Account.class, accountId);
    profile.setAccount(accountRef);
    try {
      profile = repository.save(profile);
    } catch (DataIntegrityViolationException e) {
      // Сработает, если для accountId уже существует профиль (unique constraint)
      throw new PersistenceError("UserProfile");
    }
    return mapper.toModel(profile);

  }
  public ProfileResponse getProfile(UUID accountId){
    UserProfile profile = repository.getByAccountId(accountId);
    return mapper.toModel(profile);

  }
  public ProfileResponse updateProfile(ProfileCreateRequest request, UUID accountId){
      UserProfile profile = repository.getByAccountId(accountId);
      if(Objects.isNull(profile)) throw new ProfileNotFounded();
      profile.setFirstName(request.firstName());
      profile.setSecondName(request.lastName());
      profile.setSurnameName(request.surname());
      profile.setBirthDate(request.birthday());

    try {
      repository.save(profile);
    } catch (OptimisticLockingFailureException | DataIntegrityViolationException e) {
      throw new PersistenceError("UserProfile");
    }
    return mapper.toModel(profile);


  }
  public ProfileResponse deleteProfile(UUID accountId){
    UserProfile profile = repository.getByAccountId(accountId);
    if(Objects.isNull(profile)) throw new ProfileNotFounded();
    try {
      repository.delete(profile);
    } catch (OptimisticLockingFailureException e) {
      throw new ConcurrentModificationException(
          "UserProfile"
      );
    } catch (DataIntegrityViolationException e) {
      throw new DeleteConstraintException(
          "UserProfile"
      );
    }
    return mapper.toModel(profile);
  }

}
