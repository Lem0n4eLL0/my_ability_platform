package com.example.authenticaton.repository;

import com.example.authenticaton.model.entity.RefreshToken;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {

  Optional<RefreshToken> findByToken(String token);

  Set<RefreshToken> findAllByAccountId(UUID id);
}
