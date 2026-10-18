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
    res.json(await TurnoModel.findAll());
};

export const getById = async (req: Request<IdParams>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }

    const turno = await TurnoModel.findById(id);
    if (!turno) {
        return res.status(404).json({ error: 'Turno no encontrado' });
    }

    res.status(200).json(turno);
};

export const getWithFilters = async (req: Request, res: Response) =>{
    const id_turno = req.query.id === undefined ? undefined : Number(req.query.id);
    const horario = req.query.horario as string | undefined;
    const sala = req.query.sala as 'A17' | 'A19' | undefined;
    const razon = req.query.razon as string | undefined;
    const descripcion = req.query.descripcion as string | undefined;
    const estado = req.query.estado as 'pendiente' | 'cancelado' | 'confirmado'| undefined;
    const id_paciente = req.query.id_paciente === undefined ? undefined : Number(req.query.id_paciente);
    const id_doctor = req.query.id_doctor === undefined ? undefined : Number(req.query.id_doctor);

    const turno = await TurnoModel.findWithFilters(id_turno,horario,sala,razon,descripcion,estado,id_paciente,id_doctor);
    if (!turno) {
        return res.status(404).json({ error: 'Turno no encontrado' });
    }
    
    res.status(200).json(turno)
}

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