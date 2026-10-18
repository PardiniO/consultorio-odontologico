const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import type { Request, Response } from "express";
import { DoctorModel} from "../models/doctor.model";

export async function registrar(req: Request, res: Response){

    const {nombre, apellido, rol, usuario, es_admin } = req.body;
    const contraseña = await bcrypt.hash(req.body.contraseña, 10);
    const rows = await DoctorModel.findAll();
    const esPrimero: boolean = rows.length === 0;

    const doctor = {
        nombre: nombre,
        apellido: apellido,
        rol: rol,
        usuario: usuario,
        contraseña: contraseña,
        es_admin: esPrimero ? true : false}

    await DoctorModel.create(doctor);
    res.status(201).json({
    mensaje: 'Doctor registrado correctamente'
});
};

export async function login(req: Request, res: Response){
    try{

const {usuario, contraseña} = req.body;
const usuarioExiste = await DoctorModel.findByUser(usuario)

if (!usuarioExiste){
   return res.status(401).json('Credenciales invalidas');
}

const coincide = await bcrypt.compare(contraseña, usuarioExiste.contraseña);

if(!coincide){
   return res.status(401).json('Credenciales invalidas');
}

const token = jwt.sign(
    {id: usuarioExiste.id, rol: usuarioExiste.rol, esAdmin: usuarioExiste.es_admin},
    process.env.JWT_SECRET,
    {expiresIn: '2h'}
)

res.status(200).json({token})
}

catch(error){console.log(error)}

};