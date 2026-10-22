INSERT INTO usuarios (nombre, apellido, username, contraseña)
VALUES
('Jaime', 'Capusotto', 'Jcapu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
('Juan', 'Fernandez', 'Jfer', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
('Sofia', 'Martinez', 'SofMart', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
('Maria', 'Torres', 'Mtorres', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
('Carlos', 'Lopez', 'clopez', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'),
('Ana', 'Rodriguez', 'arodriguez', '$2b$10$abcdefghijklmnopqrstuu12345678901234567890123456789012'),
('Diego', 'Ramirez', 'dramirez', '$2b$10$uvwxyzabcdefghijklmnopqrstuv12345678901234567890123456'),
('Laura', 'Sanchez', 'lsanchez', '$2b$10$123456789012345678901uabcdefghijklmnopqrstuvABCDEFGHIJK');

INSERT INTO pacientes (id_usuario, fecha_nacimiento)
VALUES
(1, 'Perez', '1998-05-12'),
(2, 'Gonzalez', '2001-09-23'),
(3, 'Fernandez', '1995-02-17'),
(4, 'Martinez', '2003-11-08');

INSERT INTO doctores (id_usuario, rol, es_admin)
VALUES
(5, 'Endodoncista', TRUE),
(6, 'Ortodoncista', FALSE),
(7, 'Endodoncista', FALSE),
(8, 'Ortodoncista', FALSE);

INSERT INTO turnos
(horario, sala, razon, descripcion, estado, id_paciente, id_doctor)
VALUES
(
    '2026-10-20', 'A17',
    'Dolor dental', 'Dolor en molar',
    'pendiente', 1, 1
),
(
    '2026-10-21', 'A19',
    'Control', 'Revision general',
    'confirmado', 2, 2
),
(
    '2026-10-22', 'A17',
    'Endodoncia', 'Tratamiento molar',
    'confirmado', 3, 3
),
(
    '2026-10-23', 'A19',
    'Ortodoncia', 'Control de brackets',
    'cancelado', 4, 4
);