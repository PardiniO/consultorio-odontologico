import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { pool } from "../config/db";

export interface Paciente {
    id: number;
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
}

export type PacienteInput = Omit<Paciente, 'id'>;

interface PacienteRow extends RowDataPacket, Paciente {}

export const PacienteModel = {
    // async findAll(limit: number, offset: number): Promise<Paciente[]> {
    //     const [rows] = await pool.query<PacienteRow[]>(
    //         'SELECT id_paciente, nombre, apellido, fecha_nacimiento FROM pacientes LIMIT ? OFFSET ?',
    //         [limit, offset]
    //     );
    //     return rows;
    // },

    async findAll(): Promise<Paciente[]> {
        const [rows] = await pool.query<PacienteRow[]>(
            'SELECT id_paciente, nombre, apellido, fecha_nacimiento FROM pacientes'
        );
        return rows;
    },

    async findById(id: number): Promise<Paciente | null> {
        const [rows] = await pool.query<PacienteRow[]>(
            'SELECT id_paciente, nombre, apellido, fecha_nacimiento FROM pacientes WHERE id_paciente = ?; ',
            [id]
        );
        return rows[0] ?? null;
    },

    async create(data: PacienteInput): Promise<Paciente> {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO pacientes(nombre, apellido, fecha_nacimiento) VALUES(?,?,?)',
            [data.nombre, data.apellido, data.fecha_nacimiento]
        );
        return { id: result.insertId, ...data };
    },

    async update(id: number, data: PacienteInput): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE pacientes SET nombre = ?, apellido = ?, fecha_nacimiento = ? WHERE id_paciente = ?',
            [data.nombre, data.apellido, data.fecha_nacimiento, id]
        );
        return result.affectedRows > 0;
    },

    async remove(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM Pacientes WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    },
};