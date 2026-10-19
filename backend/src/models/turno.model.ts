
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { pool } from '../config/db';

export interface Turno {
  id: number;
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

export type TurnoInput = Omit<
  Turno,
  | 'id'
  | 'nombre_paciente'
  | 'apellido_paciente'
  | 'fecha_nacimiento_paciente'
  | 'nombre_doctor'
  | 'apellido_doctor'
  | 'rol_doctor'
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
      FROM v_turnos`
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
      WHERE id_turno = ?`,
      [id]
    );

    return rows[0] ?? null;
  },

  async findWithFilters(
    id_turno?: number,
    horario?: string,
    sala?: 'A17' | 'A19',
    razon?: string,
    descripcion?: string,
    estado?: 'pendiente' | 'cancelado' | 'confirmado',
    id_paciente?: number,
    id_doctor?: number
  ): Promise<Turno[]> {
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
      WHERE
        id_turno = COALESCE(?, id_turno)
        AND horario = COALESCE(?, horario)
        AND sala = COALESCE(?, sala)
        AND razon = COALESCE(?, razon)
        AND descripcion = COALESCE(?, descripcion)
        AND estado = COALESCE(?, estado)
        AND id_paciente = COALESCE(?, id_paciente)
        AND id_doctor = COALESCE(?, id_doctor)`,
      [
        id_turno ?? null,
        horario ?? null,
        sala ?? null,
        razon ?? null,
        descripcion ?? null,
        estado ?? null,
        id_paciente ?? null,
        id_doctor ?? null
      ]
    );

    return rows;
  },

  async create(data: TurnoInput): Promise<Turno | null> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO turnos
        (horario, sala, razon, descripcion, estado, id_paciente, id_doctor)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
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

    return TurnoModel.findById(result.insertId);
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
  }
};
