package com.example.GigAnt.authentication.repository;

import com.example.GigAnt.authentication.model.entity.AccountStatus;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountStatusRepository extends JpaRepository<AccountStatus, UUID> {

}
