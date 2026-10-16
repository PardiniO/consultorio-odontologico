// Este archivo levanta el servidor Express después de asegurarse de que la base de datos está disponible, inicia la aplicación, prueba la conexión MySQL y escucha en el puerto definido

import app from './app';
import { env } from './config/env';
import { testConnection } from './config/db';
// Se importa la aplicación Express ya configurada en app.ts, se trae el objeto env con las variables de entorno y se importa la función testConnection() para verificar la conexión a MySQL

async function main() {
    await testConnection();
    // Hace un ping a la base de datos, si falla el servidor no arranca
    app.listen(env.PORT, () => {
        console.log(`Servidor en http://localhost:${env.PORT}`);
    });
    // Levanta el servidor Express en el puerto indicado en .env
}
// Se define la función principal main()

main().catch((err) => {
    console.error('No se pudo iniciar el servidor', err);
    process.exit(1);
});
// Ejecuta main(), si ocurre un error como que MySQL no response, lo captura y muestra un mensaje en consola finalizando el proceso con process.exit(1)

// Recorrido completo:
//     1) .env: Credenciales
//     2) env.ts: Validación
//     3) db.ts: Pool de conexiones
//     4) producto.model.ts: Consultas SQL
//     5) producto.controller.ts: Lógica de negocio
//     6) producto.routes.ts + index.ts: Rutas
//     7) app.ts: Configuración de la aplicación
//     8) Server.ts: Arranque del servidor