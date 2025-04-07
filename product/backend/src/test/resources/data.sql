INSERT INTO users (id, created_at, updated_at, email, password, username, qualification_id, marks) VALUES(
'9e16c6e7-3ca8-459d-8bd6-d3f9267510a2',
'2024-11-13 13:21:52.476165+00',
'2024-11-13 13:21:52.476165+00',
'test@test.com',
'$2a$10$dZDTfbG65jsRGC8qDxeV3Ofm6AoLFpdoNdch1q7hbxdwBnelNOCaq',
'user',
1,
0
);

INSERT INTO users (id, created_at, updated_at, email, password, username, marks) VALUES(
'c9dd098d-3ea0-47fb-927f-8069a682b0a2',
'2024-11-13 13:21:52.476165+00',
'2024-11-13 13:21:52.476165+00',
'admin@test.com',
'$2a$10$dZDTfbG65jsRGC8qDxeV3Ofm6AoLFpdoNdch1q7hbxdwBnelNOCaq',
'admin',
0
);

INSERT INTO qualifications (id, name) VALUES (1, 'GCSE');

INSERT INTO roles (id, name) VALUES (1, 'ROLE_ADMIN'), (2, 'ROLE_USER');
INSERT INTO user_roles (user_id, role_id) VALUES ('c9dd098d-3ea0-47fb-927f-8069a682b0a2', 1);
INSERT INTO user_roles (user_id, role_id) VALUES ('9e16c6e7-3ca8-459d-8bd6-d3f9267510a2', 2);