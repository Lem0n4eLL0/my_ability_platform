package com.example.GigAnt.model.entity;

import com.example.GigAnt.entity.BaseEntity;
import com.example.GigAnt.model.enums.QuestionType;
import jakarta.persistence.*;
import lombok.*;

@ToString(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "criteria_question_type_count")
public class CriteriaQuestionTypeCount extends BaseEntity {
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "test_criteria_id",
            unique = true,
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_criteria_question_type_count_test_criteria")
    )
    TestCriteria testCriteria;
    @Enumerated(EnumType.STRING)
    @Column(name = "question_type")
    QuestionType questionType;
    @Column(name = "question_number")
    Integer questionNumber;

}
