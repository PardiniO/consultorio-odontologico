const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import type { Request, Response } from 'express';
import { DoctorModel } from '../models/doctor.model';
import { PacienteModel } from '../models/paciente.model';
import { AuthService } from "../services/auth.service";

export async function register(req: Request, res: Response) {
    const { nombre, apellido, username, contrasena } = req.body;
    if (!username || !contrasena) {
        return res.status(400).json({ message: 'Se necesita el nombre de usuario y la contraseña' });
    }

    try {
        const user = await AuthService.register(
            { nombre, apellido, username, contrasena } as Parameters<typeof AuthService.register>[0]
        );
        return res.status(201).json(user);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al registrarse';
        return res.status(400).json({ message });
    }
}

export async function login(req: Request, res: Response) {
    const { username, contrasena } = req.body;
    if (!username || !contrasena) {
        return res.status(400).json({ message: 'Se necesitan todos los campos' });
    }

    try {
        const { token, user } = await AuthService.login(username, contrasena);
        return res.json({ token, user });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Credenciales inválidas';
        return res.status(401).json({ message });
    }
}