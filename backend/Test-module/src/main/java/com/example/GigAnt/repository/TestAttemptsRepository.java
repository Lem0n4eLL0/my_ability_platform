package com.example.GigAnt.repository;

import com.example.GigAnt.model.entity.TestAttempts;
import com.example.GigAnt.model.entity.TestCriteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface TestAttemptsRepository extends JpaRepository<TestAttempts, UUID> {
    public List<TestAttempts> findAllByProfileId(Integer profileId);
    @Query("""
    SELECT ta FROM TestAttempts ta
    WHERE ta.profileId = :profileId 
      AND ta.test.id = :testId
    ORDER BY ta.startedAt DESC, ta.id DESC 
    LIMIT 1
    """)
    TestAttempts findLastAttemptByProfileAndTest(
            @Param("profileId") Integer profileId,
            @Param("testId") UUID testId
    );
}
