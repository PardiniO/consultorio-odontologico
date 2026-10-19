
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { pool } from '../config/db';

export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  usuario: string;
  contraseña: string;
}

export type PacienteInput = Omit<Paciente, 'id'>;

interface PacienteRow extends RowDataPacket, Paciente {}

export const PacienteModel = {
  async findAll(): Promise<Paciente[]> {
    const [rows] = await pool.query<PacienteRow[]>(
      `SELECT
        id_paciente,
        nombre,
        apellido,
        fecha_nacimiento,
        usuario,
        contraseña
      FROM pacientes`
    );

    return rows;
  },

  async findById(id: number): Promise<Paciente | null> {
    const [rows] = await pool.query<PacienteRow[]>(
      `SELECT
        id_paciente,
        nombre,
        apellido,
        fecha_nacimiento,
        usuario,
        contraseña
      FROM pacientes
      WHERE id_paciente = ?`,
      [id]
    );

    return rows[0] ?? null;
  },

  async findWithFilters(
    id_paciente?: number,
    nombre?: string,
    apellido?: string,
    fecha_nacimiento?: string
  ): Promise<Paciente[]> {
    const [rows] = await pool.query<PacienteRow[]>(
      `SELECT
        id_paciente,
        nombre,
        apellido,
        fecha_nacimiento,
        usuario,
        contraseña
      FROM pacientes
      WHERE
        id_paciente = COALESCE(?, id_paciente)
        AND nombre = COALESCE(?, nombre)
        AND apellido = COALESCE(?, apellido)
        AND fecha_nacimiento = COALESCE(?, fecha_nacimiento)`,
      [
        id_paciente ?? null,
        nombre ?? null,
        apellido ?? null,
        fecha_nacimiento ?? null
      ]
    );

    return rows;
  },

  async create(data: PacienteInput): Promise<Paciente> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO pacientes
        (nombre, apellido, fecha_nacimiento, usuario, contraseña)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.nombre,
        data.apellido,
        data.fecha_nacimiento,
        data.usuario,
        data.contraseña
      ]
    );

    return {
      id: result.insertId,
      ...data
    };
  },

  async update(id: number, data: PacienteInput): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE pacientes
       SET
        nombre = ?,
        apellido = ?,
        fecha_nacimiento = ?,
        usuario = ?,
        contraseña = ?
       WHERE id_paciente = ?`,
      [
        data.nombre,
        data.apellido,
        data.fecha_nacimiento,
        data.usuario,
        data.contraseña,
        id
      ]
    );

    return result.affectedRows > 0;
  },

  async remove(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM pacientes WHERE id_paciente = ?',
      [id]
    );

    return result.affectedRows > 0;
  }
};
