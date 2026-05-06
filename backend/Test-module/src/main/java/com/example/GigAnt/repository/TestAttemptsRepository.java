package com.example.GigAnt.repository;

import com.example.GigAnt.model.entity.TestAttempts;
import com.example.GigAnt.model.entity.TestCriteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface TestAttemptsRepository extends JpaRepository<TestAttempts, UUID> {
}
