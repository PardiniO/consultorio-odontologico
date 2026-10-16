import mysql from 'mysql2/promise';
import { env } from './env';

// Responsabilidad del archivo: Conectar la aplicación con la base de datos

// Se importa el cliente mysql2/promise para usar async y await en lugar de callbacks

// Se trae el objeto env con las variables de entorno ya validadas

export const pool = mysql.createPool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    decimalNumbers: true
});

// createPool: En lugar de abrir una conexión nueva cada vez, se crea un pool (grupo de conexiones reutilizables)

// hostname, port, user, password, database vienen del env
// waitForConnections: true -> Si todas las conexiones están ocupadas, espera en cola en vez de fallar 
// connectionLimit: 10 -> Máximo de 10 conexiones simultaneas
// decimalNumbers: true -> Convierte los campos DECIMAL de MySQL en Number de JS

export async function testConnection(): Promise<void> {
    const conn = await pool.getConnection();
    // Pide una conexión del pool
    await conn.ping();
    // Envía un "ping" a MySQL para verificar que responde
    conn.release();
    // Devuelve la conexión al pool para que otro request la use
    console.log('Conectado a MySQL');
}