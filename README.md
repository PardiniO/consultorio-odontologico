# Consultorio odontológico

El repositorio está organizado por módulos:

- `frontend/`: aplicación web Angular.
- `backend/`: API principal Express/TypeScript.
- `backend/mi-api-explicada/`: implementación de ejemplo independiente.
- `backend/database/consultorio-odontologico.sql`: esquema y datos de ejemplo.

## Backend

Antes de iniciar la API, crea la base de datos `consultorio`, ejecuta el SQL de `backend/database/consultorio-odontologico.sql` y configura `backend/.env` con `DB_HOST`, `DB_USER` y `DB_NAME`. También puedes definir `DB_PASSWORD`, `DB_PORT` (por defecto `3306`) y `PORT` (por defecto `3000`).

```powershell
cd backend
npm install
npm run dev
```

## Frontend

En otra terminal:

```powershell
cd frontend
npm install
npm start
```

La aplicación queda disponible en `http://localhost:4200/`.

## Compilar

Ejecuta `npm run build` desde `frontend/` o desde `backend/`, según el módulo que quieras compilar.
