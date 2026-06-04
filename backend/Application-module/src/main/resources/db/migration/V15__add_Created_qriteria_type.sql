ALTER TABLE criteria_question_type_count
ADD COLUMN created_at TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP,
ADD COLUMN version INTEGER DEFAULT 0;