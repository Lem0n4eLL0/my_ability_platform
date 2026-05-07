package com.example.GigAnt.repository;

import com.example.GigAnt.model.entity.Question;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuestionRepository extends JpaRepository<Question, UUID> {
    @Query(value = "WITH test_info AS (\n" +
            "    -- Получаем все criteria для теста\n" +
            "    SELECT \n" +
            "        tc.id as criteria_id,\n" +
            "        tc.category_id,\n" +
            "        tc.min_difficulty,\n" +
            "        tc.max_difficulty,\n" +
            "        qntc.question_type,\n" +
            "        qntc.question_number\n" +
            "    FROM test_criteria tc\n" +
            "    JOIN criteria_question_type_count qntc ON qntc.test_criteria_id = tc.id\n" +
            "    WHERE tc.test_id = :testId\n" +
            "),\n" +
            "filtered_questions AS (\n" +
            "    -- Фильтруем вопросы по всем criteria\n" +
            "    SELECT DISTINCT\n" +
            "        q.id,\n" +
            "        q.text,\n" +
            "        q.type,\n" +
            "        q.difficulty,\n" +
            "        q.options,\n" +
            "        q.points,\n" +
            "        q.explanation,\n" +
            "        q.created_at,\n" +
            "        q.updated_at,\n" +
            "        q.version,\n" +
            "        q.is_active,\n" +
            "        q.correct_answer,\n" +
            "        ti.question_type,\n" +
            "        ti.question_number\n" +
            "    FROM question q\n" +
            "    JOIN question_category cq ON cq.question_id = q.id\n" +
            "    JOIN test_info ti ON ti.category_id = cq.category_id\n" +
            "    WHERE q.is_active = true\n" +
            "        AND q.difficulty BETWEEN ti.min_difficulty AND ti.max_difficulty\n" +
            "        AND q.type = ti.question_type\n" +
            "),\n" +
            "random_selection AS (\n" +
            "    SELECT \n" +
            "        fq.*,\n" +
            "        ROW_NUMBER() OVER (\n" +
            "            PARTITION BY fq.question_type \n" +
            "            ORDER BY RANDOM()\n" +
            "        ) as rn\n" +
            "    FROM filtered_questions fq\n" +
            ")\n" +
            "SELECT \n" +
            "    id, text, type, difficulty, options, points, explanation, correct_answer,created_at, updated_at, version, is_active\n" +
            "FROM random_selection\n" +
            "WHERE rn <= question_number;",nativeQuery = true)
    List<Question> findAllQuestionsByTestIdAndByCriteries(@Param("testId") UUID testId);
}
