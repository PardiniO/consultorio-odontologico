import { Request, Response } from 'express';
import { UsuarioModel } from "../models/usuario.model";
import { UsuarioI } from '../interfaces/usuario.interface';
import { RespuestaAPI } from "../interfaces/respuestaAPI.interface";

export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const usuarios: UsuarioI[] = await UsuarioModel.findAll();
        
        const respuesta: RespuestaAPI<UsuarioI[]> = {
            success: true,
            data: usuarios,
            message: `Se encontraron ${usuarios.length} usuarios`
        };
        return res.status(200).json(respuesta);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al obtener usuarios';
        const respuesta: RespuestaAPI<null> = { success: false, message };
        return res.status(500).json(respuesta);
    };
};

export const getUsersById = async (req: Request, res: Response): Promise<Response> => {
    const idParam = req.params.id;
    const id = Number.parseInt(Array.isArray(idParam) ? idParam[0] ?? '' : idParam, 10);
    if (Number.isNaN(id)) {
        const respuesta: RespuestaAPI<null> = { success: false, message: 'Id inválido' };
        return res.status(400).json(respuesta);
    }

    try {
        const usuario = await UsuarioModel.findById(id);
        if (usuario) {
            const respuesta: RespuestaAPI<UsuarioI> = {
                success: true,
                data: usuario,
                message: 'Usuario ${usuario} encontrado'
            };
        return res.status(200).json(respuesta);
        } else {
            const respuesta: RespuestaAPI<null> = {
                success: false,
                message: 'Usuario no encontrado'
            };
            return res.status(404).json(respuesta);
        }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al buscar usuario';
        const respuesta: RespuestaAPI<null> = { success: false, message };
        return res.status(500).json(respuesta);
    }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { nombre, apellido, username, contrasena } = req.body as UsuarioI;

    if (!nombre || !username) {
        const respuesta: RespuestaAPI<null> = {
            success: false,
            message: 'Nombre y email son requeridos'
        };
        return res.status(400).json(respuesta);
    }
    
    try {
        const crearResultado = await UsuarioModel.create({ nombre, apellido, contrasena } as UsuarioI);

        if (typeof crearResultado === 'number') {
            const nuevoUsuario = await UsuarioModel.findById(crearResultado);

            if (!nuevoUsuario) {
                const respuesta: RespuestaAPI<null> = {  success: false, message: 'Error al recuperar usuario creado' };
                return res.status(500).json(respuesta);
            }
            const respuesta: RespuestaAPI<UsuarioI> = {
                success: true,
                data: nuevoUsuario,
                message: 'Usuario creado correctamente'
            };
            return res.status(201).json(respuesta);
        } else {
            const respuesta: RespuestaAPI<null> = { success: false, message: 'Error al crear usuario' };
            return res.status(500).json(respuesta);
        }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al crear usuario';
        const respuesta: RespuestaAPI<null> = { success: false, message };
        return res.status(500).json(respuesta);
    }
};

export const removeUser = async (req: Request, res: Response): Promise<Response> => {
    const idParam = req.params.id;
    const id = Number.parseInt(Array.isArray(idParam) ? idParam[0] ?? '' : idParam, 10);
    if (Number.isNaN(id)) {
        const respuesta: RespuestaAPI<null> = { success: false, message: 'Id inválido' };
        return res.status(400).json(respuesta);
    }

    try {
        const resultado = await UsuarioModel.removeUser(id);

        const borrado = typeof resultado === 'number' ? resultado > 0 : Boolean(resultado);

        if (borrado) {
            const respuesta: RespuestaAPI<null> = {
                success: true,
                message: 'Usuario eliminado exitosamente'
            };
            return res.status(200).json(respuesta);
        } else {
            const respuesta: RespuestaAPI<null> = {
                success: false,
                message: 'Usuario no encontrado'
            };
            return res.status(404).json(respuesta);
        }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al eliminar usuario';
        const respuesta: RespuestaAPI<null> = { success: false, message };
        return res.status(500).json(respuesta);
    }
};