ALTER TABLE test_attempts DROP CONSTRAINT IF EXISTS fk_test_attempts_profile;


ALTER TABLE test_attempts DROP COLUMN IF EXISTS profile_id;


ALTER TABLE test_attempts ADD COLUMN profile_id INTEGER;


ALTER TABLE test_attempts ALTER COLUMN profile_id SET NOT NULL;


ALTER TABLE test_attempts
    ADD CONSTRAINT fk_test_attempts_profile
    FOREIGN KEY (profile_id) REFERENCES user_profile(id) ON DELETE CASCADE;


CREATE INDEX idx_test_attempts_profile_id ON test_attempts(profile_id);