import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { pool } from "../config/db";

export interface Turno {
    id_turno: number;
    horario: string | Date;
    sala: 'A17' | 'A19';
    razon: string;
    descripcion: string;
    estado: 'pendiente' | 'cancelado' | 'confirmado';
    id_paciente: number;
    nombre_paciente: string;
    apellido_paciente: string;
    fecha_nacimiento_paciente: string;
    id_doctor: number;
    nombre_doctor: string;
    apellido_doctor: string;
    rol_doctor: 'Endodoncista' | 'Ortodoncista';
}

export type TurnoInput = Omit<Turno,
                            'id_turno' |
                            'nombre_paciente' |
                            'apellido_paciente' |
                            'fecha_nacimiento_paciente' |
                            'nombre_doctor' |
                            'apellido_doctor' |
                            'rol_doctor'
                            >;

interface TurnoRow extends RowDataPacket, Turno {}

export const TurnoModel = {
    async findAll(): Promise<Turno[]> {
        const [rows] = await pool.query<TurnoRow[]>(
            `SELECT
                id,
                horario,
                sala,
                razon,
                descripcion,
                estado,
                id_paciente,
                nombre_paciente,
                apellido_paciente,
                fecha_nacimiento_paciente,
                id_doctor,
                nombre_doctor,
                apellido_doctor,
                rol_doctor
            FROM v_turnos;`,
        );
        return rows;
    },

    async findById(id: number): Promise<Turno | null> {
        const [rows] = await pool.query<TurnoRow[]>(
            `SELECT
                id,
                horario,
                sala,
                razon,
                descripcion,
                estado,
                id_paciente,
                nombre_paciente,
                apellido_paciente,
                fecha_nacimiento_paciente,
                id_doctor,
                nombre_doctor,
                apellido_doctor,
                rol_doctor
            FROM v_turnos
            WHERE id = ?`,
            [id]
        );
        return rows[0] ?? null;
    },
    async create(data: TurnoInput): Promise<Turno | null> {
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO turnos (horario, sala, razon, descripcion, estado, id_paciente, id_doctor)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.horario, 
                data.sala, 
                data.razon, 
                data.descripcion,
                data.estado, 
                data.id_paciente, 
                data.id_doctor
            ]
        );
        const turno = await TurnoModel.findById(result.insertId)
        
        return turno;
    },

    async update(id: number, data: TurnoInput): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE turnos
            SET
                horario = ?,
                sala = ?,
                razon = ?,
                descripcion = ?,
                estado = ?,
                id_paciente = ?,
                id_doctor = ?
            WHERE id_turno = ?`,
            [
                data.horario, 
                data.sala, 
                data.razon, 
                data.descripcion, 
                data.estado,
                data.id_paciente, 
                data.id_doctor, 
                id
            ]
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
