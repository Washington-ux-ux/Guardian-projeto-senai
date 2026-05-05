

import { Router } from "express";
import * as missingPerson from "./src/controller/missing-controller.js";
import * as foundPerson from "./src/controller/located-controller.js";

const router = Router();

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