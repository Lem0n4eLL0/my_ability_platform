package com.example.GigAnt.repository;

import com.example.GigAnt.model.entity.CriteriaQuestionTypeCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CriteriaQuestionTypeCountRepository extends JpaRepository<CriteriaQuestionTypeCount, UUID> {
    List<CriteriaQuestionTypeCount> findAllByTestCriteriaId(UUID testCriteriaId);
}
