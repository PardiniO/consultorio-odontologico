const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import type { Request, Response } from 'express';
import { DoctorModel } from '../models/doctor.model';
import { PacienteModel } from '../models/paciente.model';
import { AuthService } from "../services/auth.service";

export async function registrarDoctor(req: Request, res: Response) {
  const { nombre, apellido, rol, usuario } = req.body;

  const buscarExistente = await DoctorModel.findByUser(usuario);
if(buscarExistente){
    return res.status(409).json({error: 'Usuario con este nombre ya esta registrado'})
}
  const contrasena = await bcrypt.hash(req.body.contrasena, 10);
  const rows = await DoctorModel.findAll();
  const esPrimero: boolean = rows.length === 0;

  const doctor = {
    nombre: nombre,
    apellido: apellido,
    rol: rol,
    usuario: usuario,
    contrasena: contrasena,
    es_admin: esPrimero ? true : false,
  };

  await DoctorModel.create(doctor);
  res.status(201).json({
    mensaje: 'Doctor registrado correctamente',
  });
}

export async function loginDoctor(req: Request, res: Response) {
  try {
    const { usuario, contrasena } = req.body;
    const usuarioExiste = await DoctorModel.findByUser(usuario);

    if (!usuarioExiste) {
      return res.status(401).json('Credenciales invalidas');
    }

    const coincide = await bcrypt.compare(contrasena, usuarioExiste.contrasena);

    if (!coincide) {
      return res.status(401).json('Credenciales invalidas');
    }

    const token = jwt.sign(
      {
        id: usuarioExiste.id,
        rol: usuarioExiste.rol,
        esAdmin: usuarioExiste.es_admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' },
    );

    console.log({
        id: usuarioExiste.id,
        rol: usuarioExiste.rol,
        esAdmin: usuarioExiste.es_admin,
    });

    console.log(token);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
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