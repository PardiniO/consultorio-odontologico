INSERT INTO pacientes 
(nombre, apellido, fecha_nacimiento)
VALUES
('Juan', 'Perez', '1998-05-12'),
('Maria', 'Gonzalez', '2001-09-23'),
('Lucas', 'Fernandez', '1995-02-17'),
('Sofia', 'Martinez', '2003-11-08');

INSERT INTO doctores
(nombre, apellido, rol, usuario, contraseña, es_admin)
VALUES
(
    'Carlos', 'Lopez', 'Endodoncista',
    'clopez',
    '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    TRUE
),
(
    'Ana', 'Rodriguez', 'Ortodoncista',
    'arodriguez',
    '$2b$10$abcdefghijklmnopqrstuu12345678901234567890123456789012',
    FALSE
),
(
    'Diego', 'Ramirez', 'Endodoncista',
    'dramirez',
    '$2b$10$uvwxyzabcdefghijklmnopqrstuv12345678901234567890123456',
    FALSE
),
(
    'Laura', 'Sanchez', 'Ortodoncista',
    'lsanchez',
    '$2b$10$123456789012345678901uabcdefghijklmnopqrstuvABCDEFGHIJK',
    FALSE
);

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