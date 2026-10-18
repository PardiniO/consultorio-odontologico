CREATE DATABASE IF NOT EXISTS consultorio;
USE consultorio;

CREATE TABLE pacientes(
        id_paciente INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(30) NOT NULL,
        apellido VARCHAR(30) NOT NULL,
        fecha_nacimiento DATE NOT NULL
);

CREATE TABLE doctores(
        id_doctor INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(30) NOT NULL,
        apellido VARCHAR(30) NOT NULL,
        rol ENUM('Endodoncista', 'Ortodoncista') NOT NULL,
        
        usuario VARCHAR(30) NOT NULL UNIQUE,
        contraseña VARCHAR(255) NOT NULL,
        
        es_admin BOOLEAN NOT NULL
);

CREATE TABLE turnos(
        id_turno INT PRIMARY KEY AUTO_INCREMENT,
        horario DATE NOT NULL,
        sala ENUM('A17', 'A19'),
        razon VARCHAR(30) NOT NULL,
        descripcion VARCHAR(30) NOT NULL,
        estado ENUM('pendiente', 'cancelado', 'confirmado'),
        
        id_paciente INT NOT NULL,
        FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente),
        id_doctor INT NOT NULL,
        FOREIGN KEY (id_doctor) REFERENCES doctores(id_doctor)
);

INSERT INTO pacientes (nombre, apellido, fecha_nacimiento)
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
