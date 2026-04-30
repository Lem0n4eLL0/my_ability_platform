ALTER TABLE user_profile
ADD COLUMN contact_phone VARCHAR(12),
ADD COLUMN github VARCHAR(50);

ALTER TABLE work_experience
DROP COLUMN description,
DROP COLUMN is_current;

ALTER TABLE user_project
DROP COLUMN project_url,
DROP COLUMN github_url,
DROP COLUMN technologies,
DROP COLUMN is_team_project,
ADD COLUMN link VARCHAR(100);

DROP TABLE IF EXISTS user_courses;

CREATE TABLE IF NOT EXISTS certificates(
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
title VARCHAR(100),
link VARCHAR(255),
profile_id UUID NOT NULL,
CONSTRAINT fk_user_certificates_profile
        FOREIGN KEY (profile_id)
        REFERENCES user_profile(id)
        ON DELETE CASCADE
);
CREATE INDEX idx_certificates_profile_id ON certificates(profile_id);

ALTER TABLE test
ADD COLUMN reconfirmation_time_seconds INTEGER;

DROP TABLE IF EXISTS attempt_questions;

CREATE TABLE IF NOT EXISTS test_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id UUID NOT NULL,
    profile_id UUID NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'IN_PROGRESS',
    score INTEGER,
    max_score INTEGER,
    estimation_procent INTEGER,
    started_at TIMESTAMP NOT NULL DEFAULT NOW(),
    finished_at TIMESTAMP,
    CONSTRAINT fk_attempt_test
        FOREIGN KEY (test_id)
        REFERENCES test(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_attempt_profile
        FOREIGN KEY (profile_id)
        REFERENCES user_profile(id)
        ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        version INTEGER NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS attempt_questions CASCADE;

CREATE TABLE attempt_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL,
    question_id UUID NOT NULL,
    user_answer JSONB,
    is_correct BOOLEAN,
    points INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_answer_attempt
        FOREIGN KEY (attempt_id)
        REFERENCES test_attempt(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_answer_question
        FOREIGN KEY (question_id)
        REFERENCES question(id)
        ON DELETE RESTRICT,
    CONSTRAINT chk_points_earned CHECK (points >= 0)
);


