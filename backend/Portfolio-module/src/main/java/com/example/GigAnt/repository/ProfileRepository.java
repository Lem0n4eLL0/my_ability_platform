package com.example.GigAnt.repository;

import com.example.GigAnt.model.entity.UserProfile;
import io.lettuce.core.dynamic.annotation.Param;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<UserProfile, Integer> {
  UserProfile getByAccountId(UUID accountId);
  @Query("""
    SELECT DISTINCT p FROM UserProfile p
    LEFT JOIN FETCH p.certificates
    LEFT JOIN FETCH p.educations
    LEFT JOIN FETCH p.projects
    LEFT JOIN FETCH p.workExperiences
    WHERE p.account.id = :accountId
    """)
  Optional<UserProfile> findFullProfileByAccountId(@Param("accountId") UUID accountId);

}
