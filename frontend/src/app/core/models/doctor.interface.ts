export interface Doctor {
    id_doctor: number;
    nombre: string;
    apellido: string;
    rol: 'Endodoncista' | 'Ortodoncista';
    es_admin: boolean;
}
