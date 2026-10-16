import type { Request, Response } from "express";
import { PacienteModel, type PacienteInput } from "../models/paciente.model";

type IdParams = { id: string };
type NameParams = { name: string }

function parseId(value: string): number | null {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

function isPacienteInput(body: any): body is PacienteInput {
    return (
        typeof body?.nombre === 'string' && body.nombre.trim() !== '' &&
        typeof body?.apellido === 'string' && body.apellido.trim() !== '' &&
        typeof body?.fecha_nacimiento === 'string' && body.fecha_nacimiento.trim() !== '' 
    );
}

export const getAll = async (_req: Request, res: Response) => {
    res.json(await PacienteModel.findAll());
};

export const getById = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }

    const paciente = await PacienteModel.findById(id);
    if (!paciente) {
        res.status(404).json({ error: 'Paciente no encontrado' });
        return;
    }

    res.json(paciente);
};

export const getByName = async (req: Request<NameParams>, res: Response) => {
    const name = req.params.name;
    if (!name) {
        res.status(400).json({ error: 'Nombre inválido' });
        return;
    }

    const paciente = await PacienteModel.findByName(name);
    if (!paciente) {
        res.status(404).json({ error: 'Paciente no encontrado' });
        return;
    }

    res.json(paciente);
};

export const create = async (req: Request, res: Response) => {
    if (!isPacienteInput(req.body)) {
        res.status(400).json({
            error: 'Datos inválidos: nombre, apellido y fecha de nacimiento son obligatorios'
        });
        return;
    }

    const nuevo = await PacienteModel.create(req.body);
    res.status(201).json(nuevo);
};

export const update = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }
    
    const ok = await PacienteModel.update(id, req.body);
    if (!ok) { res.status(404).json({ error: 'Paciente no encontrado' }); return; }

    res.json({ id, ...req.body });
};

export const remove = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }

    const ok = await PacienteModel.remove(id);
    if (!ok) {
        res.status(404).json({ error: 'Paciente no encontrado' });
        return;
    }

    res.status(204).send();
};