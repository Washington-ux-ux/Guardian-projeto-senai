import { Router } from "express";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import * as missingPerson from "./src/controller/missing-controller.js";
import * as foundPerson from "./src/controller/located-controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadsDir = path.join(process.cwd(), './docs/assets/images/uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const router = Router();

// Rota para upload de imagens
router.post("/upload-image", (req, res) => {
    try {
        const imageData = req.body.image; 
        const fileName = req.body.fileName || `image_${Date.now()}.jpg`;
        
       
        const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, "");
        
        const filePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(filePath, base64Data, "base64");
        
        const imagePath = `/assets/images/uploads/${fileName}`;
        res.json({ success: true, imagePath: imagePath });
    } catch (error) {
        console.error("Erro ao salvar imagem:", error);
        res.status(500).json({ success: false, message: "Erro ao salvar imagem" });
    }
});

// Rota para salvar missing.json
router.post("/missing/save", (req, res) => {
    try {
        console.log('📨 Requisição POST /missing/save recebida');
        console.log('Dados recebidos:', JSON.stringify(req.body, null, 2));
        
        const filePath = path.join(__dirname, "./src/data/missing.json");
        fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), "utf-8");
        
        console.log('✅ Arquivo salvo em:', filePath);
        res.json({ success: true, message: "Dados salvos com sucesso!" });
    } catch (error) {
        console.error("❌ Erro ao salvar missing.json:", error);
        res.status(500).json({ success: false, message: "Erro ao salvar dados" });
    }
});

// Rota para transferir dados para located.json
router.post("/located/save", (req, res) => {
    try {
        const filePath = path.join(__dirname, "./src/data/located.json");
        fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), "utf-8");
        res.json({ success: true, message: "Dados salvos com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar located.json:", error);
        res.status(500).json({ success: false, message: "Erro ao salvar dados" });
    }
});

// Rotas para desaparecidos
router.get("/missing", missingPerson.getAllMissing); 
router.get("/missing/search", missingPerson.getMissing); 
router.put("/missing", missingPerson.putMissing); 
router.patch("/missing/:id", missingPerson.updateMissing); 

// Rotas para localizados
router.get("/found", foundPerson.getAllLocated);
router.get("/found/search", foundPerson.getLocated);
router.patch("/found/:id", foundPerson.updateLocated); 

export default router;