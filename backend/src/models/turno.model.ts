import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { pool } from "../config/db";
import { off } from "node:cluster";

export interface Turno {
    id: number;
    horario: string | Date;
    sala: 'A17' | 'A19';
    razon: string;
    descripcion: string;
    estado: 'pendiente' | 'cancelado' | 'confirmado';
    id_paciente: number;
    id_doctor: number;
}

export type TurnoInput = Omit<Turno, 'id'>;

interface TurnoRow extends RowDataPacket, Turno {}

export const TurnoModel = {
    async findAll(): Promise<Turno[]> {
        const [rows] = await pool.query<TurnoRow[]>(
            `SELECT turnos.id_turno, turnos.horario, turnos.sala, turnos.razon, turnos.descripcion, turnos.estado, turnos.id_paciente, 
                pacientes.nombre, pacientes.apellido, pacientes.fecha_nacimiento,
                turnos.id_doctor, doctores.nombre, doctores.apellido, doctores.rol
            FROM turnos
            JOIN pacientes ON pacientes.id_paciente = turnos.id_paciente
            JOIN doctores ON doctores.id_doctor = turnos.id_doctor`
        );
        return rows;
    },

    async findById(id: number): Promise<Turno | null> {
        const [rows] = await pool.query<TurnoRow[]>(
            `SELECT turnos.id_turno, turnos.horario, turnos.sala, turnos.razon, turnos.descripcion, turnos.estado, turnos.id_paciente,
                pacientes.nombre,
                pacientes.apellido,
                pacientes.fecha_nacimiento,
                turnos.id_doctor,
                doctores.nombre,
                doctores.apellido,
                doctores.rol
            FROM turnos 
            JOIN pacientes ON pacientes.id_paciente = turnos.id_paciente
            JOIN doctores ON doctores.id_doctor = turnos.id_doctor
            WHERE id_turno = ?`,
            [id]
        );
        return rows[0] ?? null;
    },

    async create(data: TurnoInput): Promise<Turno> {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO turnos (horario, sala, razon, descripcion, estado, id_paciente, id_doctor) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [data.horario, data.sala, data.razon, data.descripcion, data.estado, data.id_paciente, data.id_doctor]
        );
        return { id: result.insertId, ...data };
    },

    async update(id: number, data: TurnoInput): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE turnos SET horario = ?, sala = ?, razon = ?, descripcion = ?, estado = ?, id_paciente = ?, id_doctor = ? WHERE id_doctor = ?',
            [data.horario, data.sala, data.razon, data.descripcion, data.id_paciente, data.id_doctor, id]
        );
        return result.affectedRows > 0;
    },

    async remove(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM turnos WHERE id_turno = ?',
            [id]
        );
        return result.affectedRows > 0;
    },
};
