-- Образование пользователя
CREATE TABLE IF NOT EXISTS education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL,
    city VARCHAR(255) NOT NULL,
    university VARCHAR(255) NOT NULL,
    faculty VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    graduation_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_education_profile
        FOREIGN KEY (profile_id)
        REFERENCES user_profile(id)
        ON DELETE CASCADE,
    CONSTRAINT chk_graduation_date CHECK (graduation_date <= CURRENT_DATE OR is_current = TRUE)
);

CREATE INDEX IF NOT EXISTS idx_education_profile ON education(profile_id);

-- Опыт работы
CREATE TABLE IF NOT EXISTS work_experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL,
    city VARCHAR(100) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    post VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_work_experience_profile
        FOREIGN KEY (profile_id)
        REFERENCES user_profile(id)
        ON DELETE CASCADE,
    CONSTRAINT chk_work_dates CHECK (
        end_date IS NULL OR end_date >= start_date
    )
);

CREATE INDEX IF NOT EXISTS idx_work_experience_profile ON work_experience(profile_id);

-- Проекты пользователя
CREATE TABLE IF NOT EXISTS user_project (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_url VARCHAR(500) NOT NULL,
    github_url VARCHAR(500),
    technologies JSONB DEFAULT '[]'::jsonb,
    start_date DATE,
    end_date DATE,
    is_team_project BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_user_project_profile
        FOREIGN KEY (profile_id)
        REFERENCES user_profile(id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_project_profile ON user_project(profile_id);

-- Курсы и сертификаты
CREATE TABLE IF NOT EXISTS user_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL,
    organization VARCHAR(255) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    certificate_id VARCHAR(500),
    completion_date DATE,
    grade VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_user_course_profile
        FOREIGN KEY (profile_id)
        REFERENCES user_profile(id)
        ON DELETE CASCADE
    CONSTRAINT fk_user_profile_avatar
                FOREIGN KEY (certificate_id)
                REFERENCES media(id)
                ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_user_course_profile ON user_course(profile_id);