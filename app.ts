import express, { Request, Response, json } from "express";
import router from "./routes.js";
import path from "path";

function createApp() {
    const app = express();
    app.use(json({ limit: '10mb' })); 
    
 
    app.get('/missing', (req, res) => {
        res.sendFile(path.join(process.cwd(), './docs/missing.html'));
    });
    
    app.get('/located', (req, res) => {
        res.sendFile(path.join(process.cwd(), './docs/located.html'));
    });
    
    app.get('/about', (req, res) => {
        res.sendFile(path.join(process.cwd(), './docs/about.html'));
    });
    
    app.use(express.static(path.join(process.cwd(), './docs')));
    app.use('/src', express.static(path.join(process.cwd(), './src')));
    app.use(router); 

    app.get('/', (req, res) => {
        res.sendFile(path.join(process.cwd(), './docs/index.html'));
    });

    return app;
}

export default createApp;