-- CREATE DATABASE IF NOT EXISTS consultorio;
-- USE consultorio;

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

INSERT INTO pacientes (nombre, apellido, fecha_nacimiento) VALUES
('Juan', 'Pérez', '1985-03-12'),
('María', 'Gómez', '1990-07-25'),
('Carlos', 'Fernández', '1978-11-05'),
('Lucía', 'Martínez', '2001-01-19'),
('Pedro', 'López', '1983-09-30'),
('Ana', 'Rodríguez', '1995-04-14'),
('Sofía', 'Hernández', '2002-12-02'),
('Miguel', 'Torres', '1975-06-21'),
('Laura', 'Ramírez', '1988-08-11'),
('Diego', 'Morales', '1992-02-28'),
('Valentina', 'Suárez', '1999-05-09'),
('Martín', 'Domínguez', '1980-10-17'),
('Camila', 'Vega', '1997-03-23'),
('Javier', 'Silva', '1984-12-12'),
('Florencia', 'Castro', '1991-07-07'),
('Andrés', 'Mendoza', '1979-09-15'),
('Paula', 'Ríos', '1986-11-29'),
('Tomás', 'Navarro', '1993-04-05'),
('Julieta', 'Aguilar', '2000-06-18'),
('Sebastián', 'Ortiz', '1982-01-08');

INSERT INTO doctores (nombre, apellido, rol, es_admin) VALUES
('Roberto', 'Sánchez', 'Endodoncista', TRUE),
('Elena', 'Martínez', 'Ortodoncista', FALSE),
('Fernando', 'Gutiérrez', 'Endodoncista', FALSE),
('Claudia', 'Paredes', 'Ortodoncista', TRUE),
('Ricardo', 'Jiménez', 'Endodoncista', FALSE),
('Patricia', 'Salazar', 'Ortodoncista', FALSE),
('Hugo', 'Cabrera', 'Endodoncista', TRUE),
('Gabriela', 'Acosta', 'Ortodoncista', FALSE),
('Alberto', 'Ramos', 'Endodoncista', FALSE),
('Mónica', 'Figueroa', 'Ortodoncista', TRUE),
('Daniel', 'Quiroga', 'Endodoncista', FALSE),
('Verónica', 'Sosa', 'Ortodoncista', FALSE),
('Oscar', 'Medina', 'Endodoncista', TRUE),
('Natalia', 'Correa', 'Ortodoncista', FALSE),
('Pablo', 'Villar', 'Endodoncista', FALSE),
('Carolina', 'Bravo', 'Ortodoncista', TRUE),
('Ignacio', 'Luna', 'Endodoncista', FALSE),
('Rocío', 'Delgado', 'Ortodoncista', FALSE),
('Esteban', 'Molina', 'Endodoncista', TRUE),
('Silvana', 'Arce', 'Ortodoncista', FALSE);

INSERT INTO turnos (horario, sala, razon, descripcion, estado, id_paciente, id_doctor) VALUES
('2026-10-15', 'A17', 'Control', 'Chequeo general', 'pendiente', 1, 1),
('2026-10-16', 'A19', 'Ortodoncia', 'Ajuste de brackets', 'confirmado', 2, 2),
('2026-10-17', 'A17', 'Endodoncia', 'Tratamiento de conducto', 'pendiente', 3, 3),
('2026-10-18', 'A19', 'Consulta', 'Dolor de muela', 'cancelado', 4, 4),
('2026-10-19', 'A17', 'Control', 'Revisión anual', 'confirmado', 5, 5),
('2026-10-20', 'A19', 'Ortodoncia', 'Cambio de ligas', 'pendiente', 6, 6),
('2026-10-21', 'A17', 'Endodoncia', 'Revisión post-tratamiento', 'confirmado', 7, 7),
('2026-10-22', 'A19', 'Consulta', 'Sensibilidad dental', 'pendiente', 8, 8),
('2026-10-23', 'A17', 'Control', 'Chequeo de encías', 'cancelado', 9, 9),
('2026-10-24', 'A19', 'Ortodoncia', 'Ajuste mensual', 'pendiente', 10, 10),
('2026-10-25', 'A17', 'Endodoncia', 'Tratamiento inicial', 'confirmado', 11, 11),
('2026-10-26', 'A19', 'Consulta', 'Dolor persistente', 'pendiente', 12, 12),
('2026-10-27', 'A17', 'Control', 'Chequeo rutinario', 'cancelado', 13, 13),
('2026-10-28', 'A19', 'Ortodoncia', 'Revisión brackets', 'pendiente', 14, 14),
('2026-10-29', 'A17', 'Endodoncia', 'Tratamiento avanzado', 'confirmado', 15, 15),
('2026-10-30', 'A19', 'Consulta', 'Molestia al masticar', 'pendiente', 16, 16),
('2026-11-01', 'A17', 'Control', 'Chequeo dental', 'confirmado', 17, 17),
('2026-11-02', 'A19', 'Ortodoncia', 'Cambio de arco', 'pendiente', 18, 18),
('2026-11-03', 'A17', 'Endodoncia', 'Revisión final', 'cancelado', 19, 19),
('2026-11-04', 'A19', 'Consulta', 'Dolor leve', 'pendiente', 20, 20);