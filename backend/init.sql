-- 1. Создаём статус аккаунта с ВАЛИДНЫМ UUID
INSERT INTO "account_status" ("id", "is_active", "is_blocked", "blocked_at", "blocked_reason")
VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890',
     true,
     false,
     NULL,
     NULL)
ON CONFLICT ("id") DO NOTHING;


INSERT INTO "account" (
    "id",
    "email",
    "password",
    "is_verified",
    "role",
    "account_status_id",
    created_at,
    updated_at,
    version
) VALUES (
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'candidate@example.com',
    '$2a$10$TestHashedPassword',
    false,
    'CANDIDATE',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    NOW(),
    CURRENT_DATE,
    0
);