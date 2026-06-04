SELECT pg_get_serial_sequence('user_profile', 'id');

ALTER SEQUENCE user_profile_id_seq START WITH 7000000;
SELECT setval('user_profile_id_seq', 6999999, true);