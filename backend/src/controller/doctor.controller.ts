import type { Request, Response } from "express";
import { DoctorModel, type DoctorInput } from "../models/doctor.model";

type IdParams = { id: string };
type NameParams = { nombre: string };

function parseId(value: string): number | null {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

function isDoctorInput(body: any): body is DoctorInput {
    return (
        typeof body?.nombre === 'string' && body.nombre.trim() !== '' &&
        typeof body?.apellido === 'string' && body.apellido.trim() !== '' &&
        typeof body?.rol === 'string' && (body.rol === 'Endodoncista' || body.sala === 'Ortodoncista') &&
        typeof body?.usuario === 'string' && body.usuario.trim() !== '' &&
        typeof body?.contraseña === 'string' && body.contraseña.trim() !== '' &&
        typeof body?.es_admin === 'boolean'
    );
}

export const getAll = async (_req: Request, res: Response) => {
    // res.json(await DoctorModel.findAll(15, 15));
    res.json(await DoctorModel.findAll());
};

export const getById = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }

    const doctor = await DoctorModel.findById(id);
    if (!doctor) {
        res.status(404).json({ error: 'Doctor no encontrado' });
        return;
    }

    res.json(doctor);
};

export const getByName = async (req: Request<NameParams>, res: Response) => {
    const name = req.params.nombre;
    if (!name) {
        res.status(400).json({error: 'Nombre inválido'});
        return;
    };

    const doctor = await DoctorModel.findByUser(name);
    if (!doctor) {
        res.status(404).json({error: 'Doctor no encontrado'});
        return;
    }

    res.json(doctor);
}

export const create = async (req: Request, res: Response) => {
    if (!isDoctorInput(req.body)) {
        res.status(400).json({
            error: 'Datos inválidos: nombre, apellido y rol son obligatorios'
        });
        return;
    }

    const nuevo = await DoctorModel.create(req.body);
    res.status(201).json(nuevo);
};

export const update = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }
    
    const ok = await DoctorModel.update(id, req.body);
    if (!ok) { res.status(404).json({ error: 'Doctor no encontrado' }); return; }

    res.json({ id, ...req.body });
};

export const remove = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }

    const ok = await DoctorModel.remove(id);
    if (!ok) {
        res.status(404).json({ error: 'Doctor no encontrado' });
        return;
    }

    res.status(204).send();
};