import cors from "cors";
import express from "express";

import accessEnv from "#root/helpers/accessEnv";

import setupRoutes from "./routes";

const PORT = accessEnv("PORT", 7101);

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true
    })
)

setupRoutes(app);

app.listen(PORT, () => {
    console.info(`Chapters service listening on ${PORT}`);
})