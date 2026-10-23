import bcrypt from "bcrypt";
import { UsuarioI, type UsuarioInput } from "../interfaces/usuario.interface";
import { UsuarioModel } from "../models/usuario.model";
import { DoctorModel } from "../models/doctor.model";

export const UsuarioService = {
    async register(data: UsuarioI): Promise<Omit<UsuarioI, "contrasena">> {
        const existe = await UsuarioModel.findByUsername(data.username);
        if (existe) throw new Error("Usuario ya registrado");

        const hashed: string = await bcrypt.hash(data.contrasena, 10);

        const creado = await UsuarioModel.create({
            ...data,
            contrasena: hashed
        });

        const { contrasena: _contrasena, ...usuarioCreado } = creado;
        return usuarioCreado;
    },

    async authenticate(username: string, contrasena: string): Promise<Omit<UsuarioInput, 'contrasena'> & { esAdmin: boolean }> {
        const user = await UsuarioModel.findByUsername(username) as UsuarioI | null;
        if (!user) throw new Error("Credenciales inválidas");
        
        const ok: boolean = await bcrypt.compare(contrasena, user.contrasena);
        if (!ok) throw new Error("Credenciales inválidas");
        
        const doctor = user.id === undefined ? null : await DoctorModel.findById(user.id);
        const esAdmin = doctor ? doctor.es_admin: false;

        const { contrasena: _contrasena, ...userSinPass } = user;
        return { ...userSinPass, esAdmin };
    },

    async getAll(requester: { idUser: number, esAdmin: boolean }): Promise<UsuarioI[]> {
        if (!requester.esAdmin) {
            throw new Error("Acceso denegado. Solo administradores pueden realizar esta acción");
        }
        return UsuarioModel.findAll();
    },

    async getById(requester: { idUser: number, esAdmin: boolean }, id: number): Promise<UsuarioI | null> {
        if (!requester.esAdmin && requester.idUser !== id) {
            throw new Error("Acceso denegado. Solo administradores pueden realizar esta acción");
        }
        return UsuarioModel.findById(id);
    },

    async updateUsuario(targetId: number, updates: Partial<UsuarioInput>): Promise <void> {
        const usuarioActual = await UsuarioModel.findById(targetId);
        if (!usuarioActual) throw new Error("Usuario no encontrado");

        const dataActualizada = { ...updates };

        if (dataActualizada.contrasena) {
            dataActualizada.contrasena = await bcrypt.hash(dataActualizada.contrasena, 10);
        }

        const datosCompletos: UsuarioInput = { ...usuarioActual, ...dataActualizada };
        await UsuarioModel.updateUser(targetId, datosCompletos);
    },

    async removeUsuario(requester: { id: number; esAdmin: boolean }, id: number): Promise<void> {
        if (!requester.esAdmin && requester.id !== id) {
            throw new Error("Acceso denegado. Solo administradores pueden realizar esta acción");
        }
        await UsuarioModel.removeUser(id);
    }
}