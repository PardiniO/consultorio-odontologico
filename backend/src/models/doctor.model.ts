
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { pool } from '../config/db';

export interface Doctor {
  id: number;
  nombre: string;
  apellido: string;
  rol: 'Endodoncista' | 'Ortodoncista';
  usuario: string;
  contrasena: string;
  es_admin: boolean;
}

export type DoctorInput = Omit<Doctor, 'id'>;

interface DoctorRow extends RowDataPacket, Doctor {}

export const DoctorModel = {
  async findAll(): Promise<Doctor[]> {
    const [rows] = await pool.query<DoctorRow[]>(
      `SELECT
        id_doctor,
        nombre,
        apellido,
        rol,
        usuario,
        contrasena,
        es_admin
      FROM doctores`
    );

    return rows;
  },

  async findById(id: number): Promise<Doctor | null> {
    const [rows] = await pool.query<DoctorRow[]>(
      `SELECT
        id_doctor,
        nombre,
        apellido,
        rol,
        usuario,
        contrasena,
        es_admin
      FROM doctores
      WHERE id_doctor = ?`,
      [id]
    );

    return rows[0] ?? null;
  },

  async findByUser(name: string): Promise<Doctor | null> {
    const [rows] = await pool.query<DoctorRow[]>(
      `SELECT
        id_doctor,
        nombre,
        apellido,
        rol,
        usuario,
        contrasena,
        es_admin
      FROM doctores
      WHERE usuario = ?`,
      [name]
    );

    return rows[0] ?? null;
  },

  async findWithFilters(
    id_doctor?: number,
    nombre?: string,
    apellido?: string,
    rol?: 'Endodoncista' | 'Ortodoncista',
    usuario?: string,
    contrasena?: string,
    es_admin?: boolean
  ): Promise<Doctor[]> {
    const [rows] = await pool.query<DoctorRow[]>(
      `SELECT
        id_doctor,
        nombre,
        apellido,
        rol,
        usuario,
        contrasena,
        es_admin
      FROM doctores
      WHERE
        id_doctor = COALESCE(?, id_doctor)
        AND nombre = COALESCE(?, nombre)
        AND apellido = COALESCE(?, apellido)
        AND rol = COALESCE(?, rol)
        AND usuario = COALESCE(?, usuario)
        AND contrasena = COALESCE(?, contrasena)
        AND es_admin = COALESCE(?, es_admin)`,
      [
        id_doctor ?? null,
        nombre ?? null,
        apellido ?? null,
        rol ?? null,
        usuario ?? null,
        contrasena ?? null,
        es_admin ?? null
      ]
    );

    return rows;
  },

  async create(data: DoctorInput): Promise<Doctor> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO doctores
        (nombre, apellido, rol, usuario, contrasena, es_admin)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.nombre,
        data.apellido,
        data.rol,
        data.usuario,
        data.contrasena,
        data.es_admin
      ]
    );

    return {
      id: result.insertId,
      ...data
    };
  },

  async update(id: number, data: DoctorInput): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE doctores
      SET
        nombre = ?,
        apellido = ?,
        rol = ?,
        usuario = ?,
        contrasena = ?,
        es_admin = ?
      WHERE id_doctor = ?`,
      [
        data.nombre,
        data.apellido,
        data.rol,
        data.usuario,
        data.contrasena,
        data.es_admin,
        id
      ]
    );

    return result.affectedRows > 0;
  },

  async remove(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM doctores WHERE id_doctor = ?',
      [id]
    );

    return result.affectedRows > 0;
  }
};
