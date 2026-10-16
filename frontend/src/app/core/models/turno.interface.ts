export interface Turno {
    id_turno: number;
    horario: string;
    sala: 'A17' | 'A19';
    razon: string;
    descripcion: string;
    estado: 'pendiente' | 'confirmado' | 'cancelado';
    id_paciente: number;
    id_doctor: number;
}