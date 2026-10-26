-- up = usuario paciente
-- ud = usuario doctor

CREATE VIEW v_turnos AS
SELECT 
    turnos.id_turno AS id,
    turnos.horario,
    turnos.sala,
    turnos.razon,
    turnos.descripcion,
    turnos.estado,
    pacientes.id_paciente,
    up.nombre AS nombre_paciente,
    up.apellido AS apellido_paciente,
    pacientes.fecha_nacimiento AS fecha_nacimiento_paciente,
    doctores.id_doctor,
    ud.nombre AS nombre_doctor,
    ud.apellido AS apellido_doctor,
    doctores.rol AS rol_doctor
FROM turnos
JOIN pacientes ON pacientes.id_paciente = turnos.id_paciente
JOIN doctores ON doctores.id_doctor = turnos.id_doctor;

SELECT * FROM v_turnos;
-- DROP VIEW v_turnos;