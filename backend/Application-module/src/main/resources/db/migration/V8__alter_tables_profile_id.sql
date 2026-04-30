-- V8__alter_tables_profile_id.sql
-- Безопасная смена типа FK-колонок с UUID на INTEGER (для пустых таблиц)

-- 1. user_project
ALTER TABLE user_project DROP CONSTRAINT IF EXISTS fk_user_project_profile;
ALTER TABLE user_project DROP COLUMN profile_id;
ALTER TABLE user_project ADD COLUMN profile_id INTEGER NOT NULL;
ALTER TABLE user_project ADD CONSTRAINT fk_user_project_profile
    FOREIGN KEY (profile_id) REFERENCES user_profile(id) ON DELETE CASCADE;

-- 2. certificates
ALTER TABLE certificates DROP CONSTRAINT IF EXISTS fk_certificates_profile;
ALTER TABLE certificates DROP COLUMN profile_id;
ALTER TABLE certificates ADD COLUMN profile_id INTEGER NOT NULL;
ALTER TABLE certificates ADD CONSTRAINT fk_certificates_profile
    FOREIGN KEY (profile_id) REFERENCES user_profile(id) ON DELETE CASCADE;

-- 3. education
ALTER TABLE education DROP CONSTRAINT IF EXISTS fk_education_profile;
ALTER TABLE education DROP COLUMN profile_id;
ALTER TABLE education ADD COLUMN profile_id INTEGER NOT NULL;
ALTER TABLE education ADD CONSTRAINT fk_education_profile
    FOREIGN KEY (profile_id) REFERENCES user_profile(id) ON DELETE CASCADE;

-- 4. work_experience
ALTER TABLE work_experience DROP CONSTRAINT IF EXISTS fk_work_experience_profile;
ALTER TABLE work_experience DROP COLUMN profile_id;
ALTER TABLE work_experience ADD COLUMN profile_id INTEGER NOT NULL;
ALTER TABLE work_experience ADD CONSTRAINT fk_work_experience_profile
    FOREIGN KEY (profile_id) REFERENCES user_profile(id) ON DELETE CASCADE;