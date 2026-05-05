
import { Request, Response } from "express";
import * as service from "../services/missing-services";

export const getMissing = async (req: Request, res: Response) => {
    const name = req.query.name as string || "";
    const character = await service.getMissingService(name);
    res.status(character.statusCode).json(character.body);
};

export const getAllMissing = async (req: Request, res: Response) => {
    const result = await service.getAllMissingService();
    res.status(result.statusCode).json(result.body);
};

export const updateMissing = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updateData = req.body;
    const result = await service.updateMissingService(id, updateData);
    res.status(result.statusCode).json(result.body);
};

export const putMissing = async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await service.putMissingService(newData);
    res.status(result.statusCode).json(result.body);
};
