
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { pool } from '../config/db';

export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  usuario: string;
  contrasena: string;
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
        contrasena
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
        contrasena
      FROM pacientes
      WHERE id_paciente = ?`,
      [id]
    );

    return rows[0] ?? null;
  },
async findByUser(name: string): Promise<Paciente | null> {
    const [rows] = await pool.query<PacienteRow[]>(
      `SELECT
        id_paciente,
        nombre,
        apellido,
        fecha_nacimiento,
        usuario,
        contrasena
      FROM pacientes
      WHERE usuario = ?`,
      [name]
    );

    return rows[0] ?? null;
  },
  async findWithFilters(
    id_paciente?: number,
    nombre?: string,
    apellido?: string,
    fecha_nacimiento?: string,
    usuario?: string,
    contrasena?: string
  ): Promise<Paciente[]> {
    const [rows] = await pool.query<PacienteRow[]>(
      `SELECT
        id_paciente,
        nombre,
        apellido,
        fecha_nacimiento,
        usuario,
        contrasena
      FROM pacientes
      WHERE
        id_paciente = COALESCE(?, id_paciente)
        AND nombre = COALESCE(?, nombre)
        AND apellido = COALESCE(?, apellido)
        AND fecha_nacimiento = COALESCE(?, fecha_nacimiento)
        AND usuario = COALESCE(?, usuario)
        AND contrasena = COALESCE(?, contrasena)`,
      [
        id_paciente ?? null,
        nombre ?? null,
        apellido ?? null,
        fecha_nacimiento ?? null,
        usuario ?? null,
        contrasena ?? null
      ]
    );

    return rows;
  },

  async create(data: PacienteInput): Promise<Paciente> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO pacientes
        (nombre, apellido, fecha_nacimiento, usuario, contrasena)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.nombre,
        data.apellido,
        data.fecha_nacimiento,
        data.usuario,
        data.contrasena
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
        contrasena = ?
       WHERE id_paciente = ?`,
      [
        data.nombre,
        data.apellido,
        data.fecha_nacimiento,
        data.usuario,
        data.contrasena,
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
