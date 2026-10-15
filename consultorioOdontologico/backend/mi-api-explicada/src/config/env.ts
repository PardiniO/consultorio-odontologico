import 'dotenv/config';
// Importa y ejecuta automáticamente la libreria dotenv, que carga las variables del archivo .env en process.env

function required(name: string): string {
    const value = process.env[name];
    if (!value) throw new Error(`Falta la variable de entorno; ${name}`);
    return value;
}
// Busca la variable en process.env, si no existe, lanza un error y detiene el servidor con un mensaje, si existe, la devuelve como string
// Evita que el servidor arranque con configuraciones incompletas y falle más tarde de forma confusa

export const env = {
    PORT: Number(process.env.PORT ?? 3000),
    DB_HOST: required('DB_HOST'),
    DB_PORT: Number(process.env.DB_PORT ?? 3306),
    DB_USER: required('DB_USER'),
    DB_PASSWORD: process.env.DB_PASSWORD ?? '',
    DB_NAME: required('DB_NAME'),
};
// Objeto env con las variables necesarias