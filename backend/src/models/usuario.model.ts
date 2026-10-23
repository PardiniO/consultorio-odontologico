import { pool } from "../config/db";
import { UsuarioI, UsuarioRow, UsuarioInput } from "../interfaces/usuario.interface";
import { ResultSetHeader } from "mysql2";

export const UsuarioModel = {
    async create(data: UsuarioInput): Promise<UsuarioI> {
        const [result] = await pool.query<ResultSetHeader>(`
            INSERT INTO usuarios (nombre, apellido, username, contrasena) 
            VALUES (?, ?, ?, ?)`, 
            [data.nombre, data.apellido, data.username, data.contrasena]
        );
        return { id: result.insertId, ...data };
    },

    async findAll(): Promise<UsuarioI[]> {
        const [rows] = await pool.query<UsuarioRow[]>(`
            SELECT id_usuario, nombre, apellido, username
            FROM usuarios`
        );
        return rows;
    },

    async findById(id: number): Promise<UsuarioI | null> {
        const [rows] = await pool.query<UsuarioRow[]>(`
            SELECT id_usuario, nombre, apellido, username
            FROM usuarios WHERE id_usuario = ?`, 
            [id]
        );
        const result = rows[0] as UsuarioI | undefined;
        return result ?? null;
    },
    
    async findByUsername(termino: string): Promise<UsuarioI | null> {
        const [rows] = await pool.query<UsuarioRow[]>(`
            SELECT id_usuario, username, nombre, apellido, contrasena
            FROM usuarios 
            WHERE username LIKE ?`, 
            [termino]
        );

        return rows[0] ?? null;
    },

    async findWithFilters(
        id?: number,
        nombre?: string,
        apellido?: string,
        username?: string
    ): Promise<UsuarioI[]> {
        const [rows] = await pool.query<UsuarioRow[]>(
        `SELECT
            id_usuario,
            nombre,
            apellido,
            username
        FROM usuarios
        WHERE
            id_usuario = COALESCE(?, id_usuario)
            AND nombre = COALESCE(?, nombre)
            AND apellido = COALESCE(?, apellido)
            AND username = COALESCE(?, username)`,
        [
            id?? null,
            nombre ?? null,
            apellido ?? null,
            username ?? null
        ]);
        return rows;
    },
    

    async updateUser(id: number, data: UsuarioInput): Promise<boolean> {
        const entradas = Object.entries(data) as [keyof UsuarioI, UsuarioI[keyof UsuarioI]][];
        if (entradas.length === 0) return false;

        const placeholders = entradas.map(([key]) => `${key} = ?`).join(', ');
        const values = entradas.map(([,value])=> value);

        const [result] = await pool.query<ResultSetHeader>(
            `UPDATE usuarios SET ${placeholders} WHERE id = ?`,
            [...values, id]
        );

        return result.affectedRows > 0;
    },

    async removeUser(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
        return result.affectedRows > 0;
    }
}