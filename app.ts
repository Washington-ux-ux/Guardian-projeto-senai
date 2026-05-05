import express, { Request, Response, json } from "express";
import router from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createApp() {
    const app = express();
    app.use(json());
    app.use(express.static('.'));
    app.use(router); // rotas sem /api

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../docs/index.html'));
    });

    return app;
}

export default createApp;