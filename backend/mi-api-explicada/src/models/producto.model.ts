import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";
// RowDataPacket: Tipo que representan filas devueltas por un SELECT
// ResultSetHeader: Tipo que representa metadatos de operaciones como INSERT, UPDATE o DELETE
import { pool } from "../config/db";

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
}
// Estructura de un producto en TS, coincide con la tabla SQL

export type ProductoInput = Omit<Producto, 'id'>;
// Tipo auxiliar: Un producto sin el campo id (porque al crear uno nuevo, el id lo genera MySQL automáticamente)

interface ProductoRow extends RowDataPacket, Producto {};
// Extiende RowDataPacket con la interfaz producto permitiendo que el resultado de un SELECT tenga tipado correcto

export const ProductoModel = {
    async findAll(): Promise<Producto[]> {
        const [rows] = await pool.query<ProductoRow[]>(
            'SELECT id, nombre, precio, stock FROM productos'
        );
        return rows;
    },
    // Devuelve todos los productos de la tabla, retorna un array de objetos del tipo Producto

    async findById(id: number): Promise<Producto | null> {
        const [rows] = await pool.query<ProductoRow[]>(
            'SELECT id, nombre, precio, stock FROM PRODUCTOS WHERE id = ?', [id]
        );
        return rows[0] ?? null;
    },
    // Busca un producto por id, usa ? como parámetro evitando inyección SQL, si no encuentra nada devuelve null

    async create(data: ProductoInput): Promise<Producto> {
        const [result] = await pool.query<ResultSetHeader>(
            // ResultSetHeader: SIRVE PARA OBTENER EL OBJETO DEL DATO DEL Request.BODY
            'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)', [data.nombre, data.precio, data.stock]
        );
        return {
            id: result.insertId, ...data
        }
    },
    // Inserta un nuevo producto, result.insertId devuelve el id generado automáticamente, retorna el producto completo con su nuevo id

    async update(id: number, data: ProductoInput): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?', [data.nombre, data.precio, data.stock, id]
        );
        return result.affectedRows > 0;
    },
    // Actualiza un producto existente, devuelve true si modifico alguna fila, false si no encontró el producto

    async remove(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM productos WHERE id = ?', [id]
        );
        return result.affectedRows > 0;
    }
    // Elimina el producto por id, devuelve true si se borró, false si no existía
}