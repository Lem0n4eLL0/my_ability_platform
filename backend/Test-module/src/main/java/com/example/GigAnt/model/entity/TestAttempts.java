package com.example.GigAnt.model.entity;

import com.example.GigAnt.entity.BaseEntity;
import com.example.GigAnt.model.enums.TestAttemptStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.Profile;

import java.time.LocalDateTime;

@ToString(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "test_attempts")
public class TestAttempts extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "test_id",
            unique = false,
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_test_attempts_test")
    )
    Test test;

    @Column(name = "profile_id", nullable = false)
    private Integer profileId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    TestAttemptStatus status;

    @Column(name = "score")
    int score;

    @Column(name = "maxScore")
    int maxScore;

    @Column(name = "is_passing_test")
    boolean isPassingTest;

    @Column(name = "estimationProcent")
    int estimationProcent;

    @Column(name = "reconfirmation_date")
    LocalDateTime reconfirmationDate;

    @Column(name = "startedAt")
    LocalDateTime startedAt = LocalDateTime.now();

    @Column(name = "finishedAt")
    LocalDateTime finishedAt;








}
