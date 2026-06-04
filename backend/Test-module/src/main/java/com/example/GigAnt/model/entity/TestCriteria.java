package com.example.GigAnt.model.entity;

import com.example.GigAnt.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@ToString(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "test_criteria")
public class TestCriteria extends BaseEntity {
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "test_id",
            unique = true,
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_test_criteria_test")
    )
    Test test;
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "category_id",
            unique = true,
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_test_criteria_category")
    )
    Category category;
    @Column(name = "min_difficulty", nullable = false, columnDefinition = "TEXT")
    Integer minDifficulty;
    @Column(name = "max_difficulty", nullable = false, columnDefinition = "TEXT")
    Integer maxDifficulty;



}
