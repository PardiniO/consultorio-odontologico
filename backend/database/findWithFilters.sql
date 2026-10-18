-- COALESCE(): devuelve el primer valor que no sea NULL.
-- Si el parámetro es NULL, se utiliza el valor de la columna,
-- haciendo que ese filtro sea opcional.
SELECT
*
FROM v_turnos
WHERE
	id_turno = COALESCE(?, id_turno) AND
	horario = COALESCE(?, horario) AND
    sala = COALESCE(?, sala) AND
    razon = COALESCE(?, razon) AND
    descripcion = COALESCE(?, descripcion) AND
    estado = COALESCE(?, estado) AND
    id_paciente = COALESCE(?, id_paciente) AND
    id_doctor = COALESCE(?, id_doctor);