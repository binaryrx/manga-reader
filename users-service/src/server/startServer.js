import cors from "cors";
import express from "express";

import accessEnv from "#root/helpers/accessEnv";

import setupRoutes from './routes';

const PORT = accessEnv("PORT", 7102);

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true
    })
)

setupRoutes(app);

app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err.message
    })
})

app.listen(PORT, () => {
    console.info(`Users service listening on ${PORT}`);
})