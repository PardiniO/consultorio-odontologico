SET @t_id = NULL;
SET @t_horario = NULL;
SET @t_sala = NULL;
SET @t_razon = NULL;
SET @t_descripcion = NULL;
SET @t_estado = NULL;
SET @t_id_paciente = NULL;
SET @t_id_doctor = NULL;

SELECT *
FROM v_turnos
WHERE
    id = COALESCE(@t_id, id) AND
    horario = COALESCE(@t_horario, horario) AND
    sala = COALESCE(@t_sala, sala) AND
    razon = COALESCE(@t_razon, razon) AND
    descripcion = COALESCE(@t_descripcion, descripcion) AND
    estado = COALESCE(@t_estado, estado) AND
    id_paciente = COALESCE(@t_id_paciente, id_paciente) AND
    id_doctor = COALESCE(@t_id_doctor, id_doctor);


SET @p_id = NULL;
SET @p_id_usuario = NULL;
SET @p_nombre = NULL;
SET @p_apellido = NULL;
SET @p_username = NULL;
SET @p_fecha = NULL;
SELECT 
    p.id_paciente,
    p.id_usuario,
    u.nombre,
    u.apellido,
    u.username,
    p.fecha_nacimiento
FROM pacientes p
JOIN usuarios u ON p.id_usuario = u.id_usuario
WHERE
	p.id_paciente = COALESCE(@p_id, p.id_paciente) AND
	u.nombre = COALESCE(@p_nombre, u.nombre) AND
    u.apellido = COALESCE(@p_apellido, u.apellido) AND
    u.username = COALESCE(@p_username, u.username) AND
    p.fecha_nacimiento = COALESCE(@p_fecha, p.fecha_nacimiento);

SET @d_id = NULL;
SET @d_id_usuario = NULL;
SET @d_nombre = NULL;
SET @d_apellido = NULL;
SET @d_username = NULL;
SET @d_rol = NULL;
SET @d_admin = NULL;
SELECT 
    d.id_doctor,
    d.id_usuario,
    u.nombre,
    u.apellido,
    u.username,
    d.rol,
    d.es_admin
FROM doctores d
JOIN usuarios u ON d.id_usuario = u.id_usuario
WHERE
    d.id_doctor = COALESCE(@d_id, d.id_doctor) AND
	u.nombre = COALESCE(@d_nombre, u.nombre) AND
    apellido = COALESCE(@d_apellido, u.apellido) AND
    u.username = COALESCE(@d_username, u.username) AND
	d.rol = COALESCE(@d_rol, d.rol) AND
    d.es_admin = COALESCE(@d_admin, d.es_admin);