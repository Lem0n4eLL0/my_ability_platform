package com.example.GigAnt.model.entity;

import com.example.GigAnt.entity.BaseEntity;
import com.example.GigAnt.model.enums.Difficulty;
import jakarta.persistence.*;
import lombok.*;

import java.io.DataInput;

@ToString(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "test")
public class Test extends BaseEntity {
    @Column(name = "title", length = 255, nullable = false)
    private String title;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "time_limit_seconds")
    private Integer timeLimitSeconds;

    @Column(name = "passing_score", nullable = false)
    private Integer passingScore;

    @Column(name = "recharge_time_secondes")
    private Integer rechargeTime;

    @Column(name = "reconfirmation_time_seconds")
    private Integer reconfirmationTimeSeconds;

    @Enumerated(EnumType.STRING)
    @Column(name = "difficulty")
    private Difficulty difficulty;

    @Column(name = "passing_estimation_procent")
    private Integer passing_estimation_procent;


}
