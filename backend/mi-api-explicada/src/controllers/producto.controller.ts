// Este archivo es el intermediario entre las rutas y el modelo
// Recibe el request de Express, valida parámetros y cuerpo, llama a los metodos del productoModel y devuelve la respuesta HTTP con el código adecuado

import type { Request, Response } from "express";
// Tipos de Express para tipar las funciones
import { ProductoModel, type ProductoInput } from "../models/producto.model";

type IdParams = { id: string };
// Define el tipo de los parámetros de ruta(req.params), en este caso solo un id

function parseId(value: string): number | null {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}
// Convierte el id recibido como string en número, devuelve null si no es un entero positivo para evitar ids inválidos

function isProductoInput(body: any): body is ProductoInput {
    return (
        typeof body?.nombre === 'string' && body.nombre.trim() !== '' &&
        typeof body?.precio === 'number' && body.precio >= 0 &&
        Number.isInteger(body?.stock) && body.stock >= 0
    );
}
// Valida que el body tenga los campos correctos(nombre, precio, stock), usa type guard(body is productoInput) para ayudar a TS a saber que el objeto es válido

export const getAll = async (_req: Request, res: Response) => {
    res.json(await ProductoModel.findAll());
};
// Devuelve todos los productos, 200 OK
// El _req significa que el parámetro está presente porque la función lo requiere por firma, pero en realidad no se utiliza dentro del cuerpo de la función

export const getById = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) { res.status(400).json({error: 'ID Invalido'}); return;}

    const producto = await ProductoModel.findById(id);
    if (!producto) { res.status(404).json({error: 'Producto no encontrado'}); return; }

    res.json(producto);

    // Valida el id, si no existe 400 Bad request, si no encuentra el producto 404 Not Found y si todo está bien devuelve el producto (200 OK)
}

export const create = async (req: Request, res: Response) => {
    if (!isProductoInput(req.body)) {
        res.status(400).json({
            error: 'Datos inválidos: nombre, precio y stock son obligatorios',
        });
        return;
    }

    const nuevo = await ProductoModel.create(req.body);
    res.status(201).json(nuevo);

    // Valida el body, si es invalido 400 Bad Request y si es válido crea el producto y devuelve 201 Created
}

export const update = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);

    if (!id) { res.status(400).json({error: 'ID inválido'}); return; }
    if (!isProductoInput(req.body)) {
        res.status(400).json({error: 'Datos inválidos'}); return;
    }

    const ok = await ProductoModel.update(id, req.body);
    if (!ok) { res.status(404).json({error: 'Producto no encontrado'}); return; }

    res.json({id, ...req.body});

    // Valida el id y body, si no encuentra el producto 404 Not Found, si lo actualiza devuelve el producto actualizado 200 OK
}

export const remove = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) { res.status(400).json({error: 'ID inválido'}); return; }

    const ok = await ProductoModel.remove(id);
    if (!ok) { res.status(404).json({error: 'Producto no encontrado'}); return; }

    res.status(204).send();

    // Valida el id, si no existe 404 Not notFound, si lo elimina 204 No Content (respuesta vacía)
}