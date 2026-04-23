-- ============================================
-- V3: Вопросы, тесты и категории
-- ============================================

-- 1. Сначала создаём ENUM тип для сложности


-- 2. Категории вопросов
CREATE TABLE IF NOT EXISTS category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0
);

-- 3. Вопросы
CREATE TABLE IF NOT EXISTS question (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    difficulty VARCHAR NOT NULL,
    options JSONB,
    correct_answer JSONB NOT NULL,
    explanation TEXT,
    points INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_question_difficulty ON question(difficulty);
CREATE INDEX IF NOT EXISTS idx_question_active ON question(is_active) WHERE is_active = TRUE;

-- 4. Связь вопросов с категориями (многие-ко-многим)
CREATE TABLE IF NOT EXISTS question_category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL,
    category_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_qcl_question FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE,
    CONSTRAINT fk_qcl_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE,
    CONSTRAINT uq_question_category UNIQUE (question_id, category_id)
);

CREATE INDEX IF NOT EXISTS idx_question_category_question ON question_category(question_id);
CREATE INDEX IF NOT EXISTS idx_question_category_category ON question_category(category_id);

-- 5. Тесты
CREATE TABLE IF NOT EXISTS test (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    time_limit_seconds INTEGER CHECK (time_limit_seconds > 0),
    passing_score INTEGER NOT NULL DEFAULT 70,
    recharge_time INTEGER DEFAULT 86400,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT chk_passing_score CHECK (passing_score BETWEEN 0 AND 100)
);

CREATE INDEX IF NOT EXISTS idx_test_published ON test(is_published) WHERE is_published = TRUE;

-- 6. Критерии формирования теста
CREATE TABLE IF NOT EXISTS test_criteria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id UUID NOT NULL,
    category_id UUID NOT NULL,
    min_difficulty VARCHAR,
    max_difficulty VARCHAR,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_tc_test FOREIGN KEY (test_id) REFERENCES test(id) ON DELETE CASCADE,
    CONSTRAINT fk_tc_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE,
    CONSTRAINT chk_difficulty_range CHECK (
        min_difficulty IS NULL OR max_difficulty IS NULL OR
        min_difficulty <= max_difficulty
    )
);

CREATE INDEX IF NOT EXISTS idx_test_criteria_test ON test_criteria(test_id);
CREATE INDEX IF NOT EXISTS idx_test_criteria_category ON test_criteria(category_id);