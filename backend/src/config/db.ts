import mysql from 'mysql2/promise';
import { env } from "./env";

export const pool = mysql.createPool ({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    decimalNumbers: true,
});

export async function testConnection(): Promise<void> {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log('Conectado a MySQL');
}