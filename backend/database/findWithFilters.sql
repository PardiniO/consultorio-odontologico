-- COALESCE(): devuelve el primer valor que no sea NULL.
-- Si el parámetro es NULL, se utiliza el valor de la columna,
-- haciendo que ese filtro sea opcional.

SELECT *
FROM v_turnos
WHERE
	id = COALESCE(?, id) AND
	horario = COALESCE(?, horario) AND
    sala = COALESCE(?, sala) AND
    razon = COALESCE(?, razon) AND
    descripcion = COALESCE(?, descripcion) AND
    estado = COALESCE(?, estado) AND
    id_paciente = COALESCE(?, id_paciente) AND
    id_doctor = COALESCE(?, id_doctor);

SELECT 
    p.id_paciente
    p.id_usuario
    u.nombre
    u.apellido
    u.username
    p.fecha_nacimiento
FROM pacientes p
JOIN usuarios u ON p.id_usuario = u.id_usuario
WHERE
	p.id_paciente = COALESCE(?, p.id_paciente) AND
	u.nombre = COALESCE(?, u.nombre) AND
    u.apellido = COALESCE(?, u.apellido) AND
    p.fecha_nacimiento = COALESCE(?, p.fecha_nacimiento);

SELECT 
    d.id_doctor
    d.id_usuario
    u.nombre
    u.apellido
    u.username
    d.rol
    d.es_admin
FROM doctores d
JOIN usuarios u ON d.id_usuario = u.id_usuario
	id_doctor = COALESCE(?, id_doctor) AND
WHERE
    d.id_doctor = COALESCE(?, d.id_doctor) AND
	u.nombre = COALESCE(?, u.nombre) AND
    apellido = COALESCE(?, u.apellido) AND
    u.username = COALESCE(?, u.username) AND
	d.rol = COALESCE(?, d.rol) AND
    d.es_admin = COALESCE(?, d.es_admin);