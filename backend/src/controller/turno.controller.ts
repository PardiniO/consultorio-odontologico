import type { Request, Response } from "express";
import { TurnoModel, type TurnoInput } from "../models/turno.model";

type IdParams = { id: string };

function parseId(value: string): number | null {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

function isTurnoInput(body: any): body is TurnoInput {
    return (
        typeof body?.horario === 'string' && body.horario.trim() !== '' &&
        typeof body?.sala === 'string' && (body.sala === 'A17' || body.sala === 'A19') &&
        typeof body?.razon === 'string' && body.razon.trim() !== '' &&
        typeof body?.descripcion === 'string' && body.descripcion.trim() !== '' &&
        typeof body?.estado === 'string' && (body.estado === 'pendiente' || body.estado === 'cancelado' || body.estado === 'confirmado') &&
        Number.isInteger(body?.id_paciente) && Number(body.id_paciente) > 0 &&
        Number.isInteger(body?.id_doctor) && Number(body.id_doctor) > 0
    );
}

export const getAll = async (_req: Request, res: Response) => {
    res.json(await TurnoModel.findAll(15, 15));
};

export const getById = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }

    const turno = await TurnoModel.findById(id);
    if (!turno) {
        res.status(404).json({ error: 'Turno no encontrado' });
        return;
    }

    res.json(turno);
};

export const create = async (req: Request, res: Response) => {
    if (!isTurnoInput(req.body)) {
        res.status(400).json({
            error: 'Datos inválidos: horario, sala, razón, descripción, id_paciente e id_doctor son obligatorios'
        });
        return;
    }

    const nuevo = await TurnoModel.create(req.body);
    res.status(201).json(nuevo);
};

export const update = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }
    
    const ok = await TurnoModel.update(id, req.body);
    if (!ok) { res.status(404).json({ error: 'Turno no encontrado' }); return; }

    res.json({ id, ...req.body });
};

export const remove = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }

    const ok = await TurnoModel.remove(id);
    if (!ok) {
        res.status(404).json({ error: 'Turno no encontrado' });
        return;
    }

    res.status(204).send();
};