-- ============================================
-- V4: Попытки прохождения тестов и ответы
-- ============================================

-- 1. Попытки прохождения тестов
CREATE TABLE IF NOT EXISTS test_attempt (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id UUID NOT NULL,
    profile_id UUID NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'IN_PROGRESS',
    score INTEGER,
    started_at TIMESTAMP NOT NULL DEFAULT NOW(),
    finished_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_attempt_test FOREIGN KEY (test_id) REFERENCES test(id) ON DELETE CASCADE,
    CONSTRAINT fk_attempt_profile FOREIGN KEY (profile_id) REFERENCES user_profile(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_attempt_profile ON test_attempt(profile_id);
CREATE INDEX IF NOT EXISTS idx_attempt_test ON test_attempt(test_id);
CREATE INDEX IF NOT EXISTS idx_attempt_status ON test_attempt(status) WHERE status = 'IN_PROGRESS';

-- 2. Ответы на вопросы в рамках попытки
CREATE TABLE IF NOT EXISTS attempt_answer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL,
    question_id UUID NOT NULL,
    user_answer JSONB,
    is_correct BOOLEAN,
    points_earned INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_answer_attempt FOREIGN KEY (attempt_id) REFERENCES test_attempt(id) ON DELETE CASCADE,
    CONSTRAINT fk_answer_question FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE RESTRICT,
    CONSTRAINT unique_attempt_question UNIQUE (attempt_id, question_id),
    CONSTRAINT chk_points_earned CHECK (points_earned >= 0)
);

CREATE INDEX IF NOT EXISTS idx_answer_attempt ON attempt_answer(attempt_id);
CREATE INDEX IF NOT EXISTS idx_answer_question ON attempt_answer(question_id);

-- 3. Детализация количества вопросов по типам в критериях теста
CREATE TABLE IF NOT EXISTS criteria_question_type_count (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_criteria_id UUID NOT NULL,
    question_type VARCHAR(50) NOT NULL,
    required_count INTEGER NOT NULL CHECK (required_count >= 0),
    CONSTRAINT fk_cqtc_criteria FOREIGN KEY (test_criteria_id) REFERENCES test_criteria(id) ON DELETE CASCADE,
    CONSTRAINT unique_criteria_type UNIQUE (test_criteria_id, question_type)
);

CREATE INDEX IF NOT EXISTS idx_cqtc_criteria ON criteria_question_type_count(test_criteria_id);