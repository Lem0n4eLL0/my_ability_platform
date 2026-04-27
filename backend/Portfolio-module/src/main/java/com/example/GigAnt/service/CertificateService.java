package com.example.GigAnt.service;

import com.example.GigAnt.exception.PersistenceError;
import com.example.GigAnt.exception.ProfileNotFounded;
import com.example.GigAnt.mapper.CertificateMapper;
import com.example.GigAnt.model.dto.request.CertificateRequest;
import com.example.GigAnt.model.dto.response.CertificateResponse;
import com.example.GigAnt.model.entity.Certificates;
import com.example.GigAnt.model.entity.UserProfile;
import com.example.GigAnt.repository.CertificatesRepository;
import com.example.GigAnt.repository.ProfileRepository;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CertificateService {
  private final CertificatesRepository repository;
  private final ProfileRepository profileRepository;
  private final CertificateMapper mapper;

  public CertificateResponse createCertificate(CertificateRequest request, UUID accountId) {
    UserProfile profile = profileRepository.getByAccountId(accountId);
    if (Objects.isNull(profile))
      throw new ProfileNotFounded();
    Certificates certificate = mapper.toEntity(request);
    certificate.setProfile(profile);
    try {
      repository.save(certificate);
    } catch (DataIntegrityViolationException e) {
      throw new PersistenceError("Certificates");

    }
    return mapper.toModel(certificate);
  }


}
