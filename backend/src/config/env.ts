import 'dotenv/config';

function required(name:string) {
    const value = process.env[name];
    if (!value) throw new Error(`Falta la variable de entorno ${name}`);
    
    return value;
}

export const env = {
    PORT: Number(process.env.PORT ?? 3000),
    DB_HOST: required('DB_HOST'),
    DB_PORT: Number(process.env.DB_PORT ?? 3306),
    DB_USER: required('DB_USER'),
    DB_PASSWORD: process.env.DB_PASSWORD ?? '',
    DB_NAME: required('DB_NAME'),
};