import express from "express";
import routes from "./routes";
import { notFound, errorHandler } from "./middleware/error.middleware";

import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:8080'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;