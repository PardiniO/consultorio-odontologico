CREATE DATABASE IF NOT EXISTS consultorio;
USE consultorio;

CREATE TABLE pacientes(
        id_paciente INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(30) NOT NULL,
        apellido VARCHAR(30) NOT NULL,
        fecha_nacimiento DATE NOT NULL,
        
        usuario VARCHAR(30) NOT NULL UNIQUE,
        contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE doctores(
        id_doctor INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(30) NOT NULL,
        apellido VARCHAR(30) NOT NULL,
        rol ENUM('Endodoncista', 'Ortodoncista') NOT NULL,
        
        usuario VARCHAR(30) NOT NULL UNIQUE,
        contrasena VARCHAR(255) NOT NULL,
        
        es_admin BOOLEAN NOT NULL
);

CREATE TABLE turnos(
        id_turno INT PRIMARY KEY AUTO_INCREMENT,
        horario DATE NOT NULL,
        sala ENUM('A17', 'A19') NOT NULL,
        razon VARCHAR(30) NOT NULL,
        descripcion VARCHAR(30) NOT NULL,
        estado ENUM('pendiente', 'cancelado', 'confirmado') NOT NULL,
        
        id_paciente INT NOT NULL,
        FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente) ON DELETE CASCADE,
        id_doctor INT NOT NULL,
        FOREIGN KEY (id_doctor) REFERENCES doctores(id_doctor) ON DELETE CASCADE
);