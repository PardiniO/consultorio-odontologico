import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { pool } from "../config/db";

export interface Doctor {
    id: number;
    nombre: string;
    apellido: string;
    rol: 'Endodoncista' | 'Ortodoncista';
    usuario: string;
    contraseña: string;
    es_admin: boolean;
}

export type DoctorInput = Omit<Doctor, 'id'>;

interface DoctorRow extends RowDataPacket, Doctor {}

export const DoctorModel = {
    async findAll(): Promise<Doctor[]> {
        const [rows] = await pool.query<DoctorRow[]>(
            'SELECT id_doctor, nombre, apellido,usuario, contraseña, rol, es_admin FROM doctores'
        );
        return rows;
    },

    async findById(id: number): Promise<Doctor | null> {
        const [rows] = await pool.query<DoctorRow[]>(
            'SELECT id_doctor, nombre, apellido,usuario, contraseña, rol, es_admin FROM doctores WHERE id_doctor = ?',
            [id]
        );
        return rows[0] ?? null;
    },

    async findByUser(name: string): Promise<Doctor | null> {
        const [rows] = await pool.query<DoctorRow[]>(
            'SELECT id_doctor, nombre, apellido, usuario, contraseña, rol, es_admin FROM doctores WHERE usuario = ?', [name]
        );
        return rows[0] ?? null;
    },

    async create(data: DoctorInput): Promise<Doctor> {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO doctores (nombre, apellido, rol, usuario, contraseña, es_admin) VALUES (?, ?, ?, ?, ?, ?)',
            [data.nombre, data.apellido, data.rol, data.usuario, data.contraseña, data.es_admin]
        );
        return { id: result.insertId, ...data };
    },

    async update(id: number, data: DoctorInput): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE doctores SET nombre = ?, apellido = ?, rol = ?, es_admin = ? WHERE id_doctor = ?',
            [data.nombre, data.apellido, data.rol, data.es_admin, id]
        );
        return result.affectedRows > 0;
    },

    async remove(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM doctores WHERE id_doctor = ?',
            [id]
        );
        return result.affectedRows > 0;
    },
};
