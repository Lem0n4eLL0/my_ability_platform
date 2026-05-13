package com.example.GigAnt.repository;

import com.example.GigAnt.model.entity.TestAttempts;
import com.example.GigAnt.model.entity.TestCriteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
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

    @Query(value = """
    SELECT * FROM (
        SELECT *, 
               ROW_NUMBER() OVER (
                   PARTITION BY test_id 
                   ORDER BY estimation_procent DESC, started_at DESC, id DESC
               ) AS rn
        FROM test_attempts
        WHERE profile_id = :profileId
          AND status = 'COMPLETED'
          AND reconfirmation_date > :currentTime
          AND is_passing_test = true  
    ) ranked
    WHERE rn = 1
    ORDER BY started_at DESC
    """, nativeQuery = true)
    List<TestAttempts> findBestPassedAttemptsByProfile(
            @Param("profileId") Integer profileId,
            @Param("currentTime") LocalDateTime currentTime
    );
}
