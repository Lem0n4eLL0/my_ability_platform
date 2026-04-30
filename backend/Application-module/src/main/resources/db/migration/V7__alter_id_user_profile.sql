ALTER TABLE user_profile DROP COLUMN id CASCADE;

-- 2. Добавляем новую колонку id с типом INTEGER и автоинкрементом
ALTER TABLE user_profile
    ADD COLUMN id INTEGER GENERATED ALWAYS AS IDENTITY;

-- 3. Делаем её PRIMARY KEY
ALTER TABLE user_profile ADD PRIMARY KEY (id);