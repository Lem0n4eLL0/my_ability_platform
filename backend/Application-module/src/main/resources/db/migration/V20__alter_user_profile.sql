-- 1. Удаляем старую колонку id (каскадно удаляем зависимости)
ALTER TABLE user_profile DROP COLUMN id CASCADE;

-- 2. Добавляем новую колонку id с типом UUID и автогенерацией
ALTER TABLE user_profile
    ADD COLUMN id UUID DEFAULT gen_random_uuid() NOT NULL;

-- 3. Делаем её PRIMARY KEY
ALTER TABLE user_profile
    ADD PRIMARY KEY (id);

-- 4. Добавляем поле publicId (тип UUID)
ALTER TABLE user_profile
    ADD COLUMN public_id UUID DEFAULT gen_random_uuid() NOT NULL;

-- 5. (Опционально) Можно добавить уникальный индекс на public_id, если нужно
CREATE UNIQUE INDEX idx_user_profile_public_id ON user_profile (public_id);