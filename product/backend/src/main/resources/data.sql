INSERT INTO users (id, created_at, updated_at, email, password, username, marks) VALUES (
'9b8f7d6e-2c5a-4f1b-b3a2-e0d96c718459',
'2024-11-13 13:21:52.476165+00',
'2024-11-13 13:21:52.476165+00',
'admin@test.com',
'$2a$10$dZDTfbG65jsRGC8qDxeV3Ofm6AoLFpdoNdch1q7hbxdwBnelNOCaq',
'admin',
0
) ON CONFLICT(id) DO NOTHING;

INSERT INTO roles (id, name) VALUES (1, 'ROLE_ADMIN'), (2, 'ROLE_USER') ON CONFLICT(id) DO NOTHING;
INSERT INTO user_roles (user_id, role_id) VALUES ('9b8f7d6e-2c5a-4f1b-b3a2-e0d96c718459', 1) ON CONFLICT(user_id, role_id) DO NOTHING;
