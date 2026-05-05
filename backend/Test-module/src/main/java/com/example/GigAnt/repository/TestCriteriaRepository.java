package com.example.GigAnt.repository;

import com.example.GigAnt.model.entity.Test;
import com.example.GigAnt.model.entity.TestCriteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TestCriteriaRepository extends JpaRepository<TestCriteria, UUID> {
    List<TestCriteria> findAllByTestId(UUID testId);

}
