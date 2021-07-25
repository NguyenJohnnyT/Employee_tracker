INSERT INTO department (id, dept_name)
VALUES 
(1, 'TDOONG Entertainment'),
(2, 'Content Planning'),
(3, 'Artists & Repertoire'),
(4, 'Marketing')
;

INSERT INTO roles (id, title, salary, department_id)
VALUES
(1, 'President', 250000, 1),
(2, 'Intern', 40000, 1),
(3, 'Artist', 150000, 1),
(4, 'Content Leader', 135000, 2),
(5, 'Content Staff', 95000, 2),
(6, 'A&R Leader', 125000, 3),
(7, 'A&R Staff', 110000, 3),
(8, 'Marketing Leader', 110000, 4),
(9, 'Marketing Staff', 80000, 4)
;

INSERT INTO employees (id, fname, lname, role_id, mngr_id)
VALUES
(1, 'Mina',      'Myoui',   1, NULL),
(2, 'Nayeon',    'Im',      2, 1),
(3, 'Jeongyeon', 'Yoo',     3, 1),
(4, 'Dahyun',    'Kim',     8, 1),
(5, 'Chaeyoung', 'Son',     6, 1),
(6, 'Tzuyu',     'Chou',    4, 1),
(7, 'Sana',   'Minatozaki', 9, 4),
(8, 'Momo',      'Hirai',   7, 5),
(9, 'Jihyo',     'Park',    5, 6)
;
