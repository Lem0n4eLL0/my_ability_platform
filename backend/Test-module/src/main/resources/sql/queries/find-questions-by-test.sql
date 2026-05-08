-- src/main/resources/sql/queries/find-questions-by-test.sql
WITH test_info AS (
    SELECT
        tc.id as criteria_id,
        tc.category_id,
        tc.min_difficulty,
        tc.max_difficulty,
        qntc.question_type,
        qntc.question_number
    FROM test_criteria tc
    JOIN criteria_question_type_count qntc ON qntc.test_criteria_id = tc.id
    WHERE tc.test_id = :testId
),
filtered_questions AS (
    SELECT DISTINCT
        q.id, q.text, q.type, q.difficulty, q.options, q.points,
        q.explanation, q.created_at, q.updated_at, q.version,
        q.is_active, q.correct_answer, ti.question_type, ti.question_number
    FROM question q
    JOIN question_category cq ON cq.question_id = q.id
    JOIN test_info ti ON ti.category_id = cq.category_id
    WHERE q.is_active = true
        AND q.difficulty BETWEEN ti.min_difficulty AND ti.max_difficulty
        AND q.type = ti.question_type
),
random_selection AS (
    SELECT
        fq.*,
        ROW_NUMBER() OVER (
            PARTITION BY fq.question_type
            ORDER BY RANDOM()
        ) as rn
    FROM filtered_questions fq
)
SELECT
    id, text, type, difficulty, options, points,
    explanation, correct_answer, created_at, updated_at,
    version, is_active
FROM random_selection
WHERE rn <= question_number;