export interface Turno {
    id: number;
    horario: string;
    sala: 'A17' | 'A19';
    razon: string;
    descripcion: string;
    estado: 'pendiente' | 'confirmado' | 'cancelado';
}