INSERT INTO skills_master (skill_name, category, sub_category, is_active, created_at, updated_at)
VALUES
-- Backend
('Java', 'Backend', 'Programming Language', true, NOW(), NOW()),
('Spring Boot', 'Backend', 'Java Framework', true, NOW(), NOW()),
('Hibernate', 'Backend', 'ORM Framework', true, NOW(), NOW()),
('Python', 'Backend', 'Programming Language', true, NOW(), NOW()),
('Django', 'Backend', 'Python Framework', true, NOW(), NOW()),
('Node.js', 'Backend', 'JavaScript Runtime', true, NOW(), NOW()),
('Express.js', 'Backend', 'Node Framework', true, NOW(), NOW()),

-- Frontend
('HTML', 'Frontend', 'Markup Language', true, NOW(), NOW()),
('CSS', 'Frontend', 'Styling Language', true, NOW(), NOW()),
('JavaScript', 'Frontend', 'Programming Language', true, NOW(), NOW()),
('React', 'Frontend', 'JS Framework', true, NOW(), NOW()),
('Angular', 'Frontend', 'JS Framework', true, NOW(), NOW()),
('Vue.js', 'Frontend', 'JS Framework', true, NOW(), NOW()),
('TypeScript', 'Frontend', 'Language', true, NOW(), NOW()),

-- Database
('MySQL', 'Database', 'RDBMS', true, NOW(), NOW()),
('PostgreSQL', 'Database', 'RDBMS', true, NOW(), NOW()),
('MongoDB', 'Database', 'NoSQL', true, NOW(), NOW()),
('Redis', 'Database', 'Cache', true, NOW(), NOW()),

-- DevOps / Cloud
('AWS', 'Cloud', 'Provider', true, NOW(), NOW()),
('Azure', 'Cloud', 'Provider', true, NOW(), NOW()),
('GCP', 'Cloud', 'Provider', true, NOW(), NOW()),
('Docker', 'DevOps', 'Containerization', true, NOW(), NOW()),
('Kubernetes', 'DevOps', 'Orchestration', true, NOW(), NOW()),
('Jenkins', 'DevOps', 'CI/CD', true, NOW(), NOW()),

-- Mobile
('Android', 'Mobile', 'Platform', true, NOW(), NOW()),
('Kotlin', 'Mobile', 'Language', true, NOW(), NOW()),
('Swift', 'Mobile', 'Language', true, NOW(), NOW()),
('React Native', 'Mobile', 'Framework', true, NOW(), NOW()),
('Flutter', 'Mobile', 'Framework', true, NOW(), NOW()),

-- UI/UX
('Figma', 'UI/UX', 'Design Tool', true, NOW(), NOW()),
('Adobe XD', 'UI/UX', 'Design Tool', true, NOW(), NOW()),

-- Testing
('Selenium', 'Testing', 'Automation', true, NOW(), NOW()),
('JUnit', 'Testing', 'Unit Test', true, NOW(), NOW()),
('Postman', 'Testing', 'API Tool', true, NOW(), NOW()),

-- Others
('Git', 'Tools', 'Version Control', true, NOW(), NOW()),
('Maven', 'Tools', 'Build Tool', true, NOW(), NOW()),
('Gradle', 'Tools', 'Build Tool', true, NOW(), NOW()),
('REST API', 'Backend', 'Architecture', true, NOW(), NOW()),
('GraphQL', 'Backend', 'API Query', true, NOW(), NOW());
