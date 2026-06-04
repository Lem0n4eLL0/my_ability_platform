ALTER TABLE test
  ADD COLUMN IF NOT EXISTS passing_estimation_procent INTEGER NOT NULL DEFAULT 0;

-- 3. Добавляем колонку question_number (уже с NOT NULL DEFAULT)
ALTER TABLE criteria_question_type_count
  ADD COLUMN IF NOT EXISTS question_number INTEGER NOT NULL DEFAULT 0;