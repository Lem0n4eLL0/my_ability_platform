   -- Категории вопросов
   CREATE TABLE IF NOT EXISTS category (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       title VARCHAR(255) NOT NULL UNIQUE,
       description TEXT NOT NULL,
       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
       updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
       version INTEGER NOT NULL DEFAULT 0,
       CONSTRAINT fk_category_parent
           FOREIGN KEY (parent_category_id)
           REFERENCES category(id)
           ON DELETE SET NULL
   );

   CREATE INDEX IF NOT EXISTS idx_category_parent ON category(parent_category_id);

   -- Вопросы
   CREATE TABLE IF NOT EXISTS question (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       text TEXT NOT NULL,
       type VARCHAR NOT NULL,
       difficulty VARCHAR NOT NULL,
       options JSONB,
       correct_answer JSONB NOT NULL,
       explanation TEXT,
       points INTEGER NOT NULL DEFAULT 1,
       is_active BOOLEAN NOT NULL DEFAULT TRUE,
       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
       updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
       version INTEGER NOT NULL DEFAULT 0,

   );

   CREATE INDEX IF NOT EXISTS idx_question_difficulty ON question(difficulty);
   CREATE INDEX IF NOT EXISTS idx_question_active ON question(is_active) WHERE is_active = TRUE;

   -- Связь вопросов с категориями (многие-ко-многим)
   CREATE TABLE IF NOT EXISTS question_category (
        id UUID NOT NULL,
       question_id UUID NOT NULL,
       category_id UUID NOT NULL,
       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
       updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
       version INTEGER NOT NULL DEFAULT 0,
       CONSTRAINT fk_qcl_question
           FOREIGN KEY (question_id)
           REFERENCES question(id)
           ON DELETE CASCADE,
       CONSTRAINT fk_qcl_category
           FOREIGN KEY (category_id)
           REFERENCES category(id)
           ON DELETE CASCADE
   );

   -- Тесты
   CREATE TABLE IF NOT EXISTS test (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       title VARCHAR(255) NOT NULL,
       description TEXT NOT NULL,
       time_limit_seconds INTEGER CHECK (time_limit_seconds > 0),
       passing_score INTEGER NOT NULL DEFAULT 70,
       recharge_time INTEGER DEFAULT 86400,
       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
       updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
       version INTEGER NOT NULL DEFAULT 0,
       CONSTRAINT chk_passing_score CHECK (passing_score BETWEEN 0 AND 100)
   );

   CREATE INDEX IF NOT EXISTS idx_test_published ON test(is_published) WHERE is_published = TRUE;

   -- Критерии формирования теста
   CREATE TABLE IF NOT EXISTS test_criteria (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       test_id UUID NOT NULL,
       category_id UUID NOT NULL,
       min_difficulty difficulty_level,
       max_difficulty difficulty_level,
       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
       updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
       version INTEGER NOT NULL DEFAULT 0,
       CONSTRAINT fk_tc_test
           FOREIGN KEY (test_id)
           REFERENCES test(id)
           ON DELETE CASCADE,
       CONSTRAINT fk_tc_category
           FOREIGN KEY (category_id)
           REFERENCES category(id)
           ON DELETE CASCADE,
       CONSTRAINT chk_difficulty_range CHECK (
           min_difficulty IS NULL OR max_difficulty IS NULL OR
           min_difficulty <= max_difficulty
       )
   );

   CREATE INDEX IF NOT EXISTS idx_test_criteria_test ON test_criteria(test_id);