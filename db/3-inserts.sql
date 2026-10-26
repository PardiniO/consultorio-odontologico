SELECT * FROM doctores;
INSERT INTO pacientes 
(nombre, apellido, fecha_nacimiento, usuario, contrasena)
VALUES
('Juan', 'Perez', '1998-05-12', 't4','s'),
('Maria', 'Gonzalez', '2001-09-23', 't2','s'),
('Lucas', 'Fernandez', '1995-02-17', 't1','s'),
('Sofia', 'Martinez', '2003-11-08', '5t','s');

INSERT INTO doctores
(nombre, apellido, rol, usuario, contrasena, es_admin)
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