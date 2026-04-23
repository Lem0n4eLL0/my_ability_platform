-- Таблица аккаунтов (базовая аутентификация)---
CREATE TABLE IF NOT EXISTS account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    role account_role NOT NULL,
    account_status_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_account_status
        FOREIGN KEY (account_status_id)
        REFERENCES account_status(id)
        ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_account_email ON account(email);
CREATE INDEX IF NOT EXISTS idx_account_role ON account(role);
CREATE INDEX IF NOT EXISTS idx_account_created_at ON account(created_at);

-- Профиль пользователя (кандидата)---
CREATE TABLE IF NOT EXISTS user_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    second_name VARCHAR(100) NOT NULL,
    surname_name VARCHAR(100),
    birth_date DATE,
    about_me TEXT,
    avatar_id VARCHAR(500)
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_user_profile_account
        FOREIGN KEY (account_id,avatar_id)
        REFERENCES account(id)
        ON DELETE CASCADE
    CONSTRAINT fk_user_profile_avatar
            FOREIGN KEY (avatar_id)
            REFERENCES media(id)
            ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_user_profile_account ON user_profile(account_id);

-- Профиль компании-------
CREATE TABLE IF NOT EXISTS company_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100),
    inn VARCHAR(20) NOT NULL UNIQUE,
    ogrn VARCHAR(20) NOT NULL UNIQUE,
    description TEXT,
    logo_url VARCHAR(500),
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20),
    industry VARCHAR(100),
    website_url VARCHAR(255),
    social_links JSONB DEFAULT '{}'::jsonb,
    -- Аудиторские поля и версия
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_company_profile_account
        FOREIGN KEY (account_id)
        REFERENCES account(id)
        ON DELETE CASCADE,
    CONSTRAINT chk_company_contacts CHECK (
        contact_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    )
    CONSTRAINT fk_user_profile_avatar
                FOREIGN KEY (logo_id)
                REFERENCES media(id)
                ON DELETE SET NULL

);

CREATE INDEX IF NOT EXISTS idx_company_inn ON company_profile(inn);

CREATE TABLE IF NOT EXISTS account_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
    blocked_at TIMESTAMP,
    blocked_reason TEXT,
    CONSTRAINT chk_blocked_reason CHECK (
        (is_blocked = TRUE AND blocked_reason IS NOT NULL) OR
        (is_blocked = FALSE)
    )
);