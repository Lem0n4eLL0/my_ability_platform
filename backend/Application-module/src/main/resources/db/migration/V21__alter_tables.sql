-- V9__alter_foreign_keys_to_uuid.sql
-- Безопасная смена типа FK-колонок с INTEGER на UUID

-- Включаем расширение для генерации UUID (если ещё не включено)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. user_project
ALTER TABLE user_project DROP CONSTRAINT IF EXISTS fk_user_project_profile;
ALTER TABLE user_project DROP COLUMN IF EXISTS profile_id;
ALTER TABLE user_project ADD COLUMN profile_id UUID NOT NULL;
ALTER TABLE user_project ADD CONSTRAINT fk_user_project_profile
    FOREIGN KEY (profile_id) REFERENCES user_profile(id) ON DELETE CASCADE;

-- 2. certificates
ALTER TABLE certificates DROP CONSTRAINT IF EXISTS fk_certificates_profile;
ALTER TABLE certificates DROP COLUMN IF EXISTS profile_id;
ALTER TABLE certificates ADD COLUMN profile_id UUID NOT NULL;
ALTER TABLE certificates ADD CONSTRAINT fk_certificates_profile
    FOREIGN KEY (profile_id) REFERENCES user_profile(id) ON DELETE CASCADE;

-- 3. education
ALTER TABLE education DROP CONSTRAINT IF EXISTS fk_education_profile;
ALTER TABLE education DROP COLUMN IF EXISTS profile_id;
ALTER TABLE education ADD COLUMN profile_id UUID NOT NULL;
ALTER TABLE education ADD CONSTRAINT fk_education_profile
    FOREIGN KEY (profile_id) REFERENCES user_profile(id) ON DELETE CASCADE;

-- 4. work_experience
ALTER TABLE work_experience DROP CONSTRAINT IF EXISTS fk_work_experience_profile;
ALTER TABLE work_experience DROP COLUMN IF EXISTS profile_id;
ALTER TABLE work_experience ADD COLUMN profile_id UUID NOT NULL;
ALTER TABLE work_experience ADD CONSTRAINT fk_work_experience_profile
    FOREIGN KEY (profile_id) REFERENCES user_profile(id) ON DELETE CASCADE;

-- Миграция для test_attempts (смена типа на UUID)
ALTER TABLE test_attempts DROP CONSTRAINT IF EXISTS fk_test_attempts_profile;

ALTER TABLE test_attempts DROP COLUMN IF EXISTS profile_id;

ALTER TABLE test_attempts ADD COLUMN profile_id UUID;

ALTER TABLE test_attempts ALTER COLUMN profile_id SET NOT NULL;

ALTER TABLE test_attempts
    ADD CONSTRAINT fk_test_attempts_profile
    FOREIGN KEY (profile_id) REFERENCES user_profile(id) ON DELETE CASCADE;

CREATE INDEX idx_test_attempts_profile_id ON test_attempts(profile_id);
