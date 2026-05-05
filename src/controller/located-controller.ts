import { Request, Response } from "express";
import * as service from "../services/located-services.js";

export const getLocated = async (req: Request, res: Response) => {
	const name = req.query.name as string || "";
	const result = await service.getLocatedService(name);
	res.status(result.statusCode).json(result.body);
};

export const getAllLocated = async (req: Request, res: Response) => {
	const result = await service.getAllLocatedService();
	res.status(result.statusCode).json(result.body);
};

export const updateLocated = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const updateData = req.body;
	const result = await service.updateLocatedService(id, updateData);
	res.status(result.statusCode).json(result.body);
};

