package com.example.GigAnt.model.entity;

import com.example.GigAnt.entity.BaseEntity;
import com.example.GigAnt.model.dto.external.CorrectAnswer;
import com.example.GigAnt.model.dto.external.Option;
import com.example.GigAnt.model.enums.QuestionType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.UUID;

@ToString(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "question")
public class Question extends BaseEntity {
    @Column(name = "text", length = 255, nullable = false)
    String text;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    QuestionType type;

    @Column(name = "difficulty", nullable = false)
    int difficulty;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "correct_answer")
    List<CorrectAnswer> correctAnswer;

    @Column(name = "explanation", length = 255, nullable = false)
    String explanation;

    @Column(name = "points",  nullable = false)
    int points;

    @Column(name = "is_active",  nullable = false)
    boolean isActive;

}
