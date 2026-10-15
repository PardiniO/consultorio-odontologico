import app from "./app";
import { env } from "./config/env";
import { testConnection } from "./config/db";

async function main() {
    await testConnection();
    app.listen(env.PORT, () => {
        console.log(`Servidor en http://localhost:${env.PORT}`);
    });
}

main().catch((err) => {
    console.error('No se pudo iniciar el servidor:', err);
    process.exit(1);
});