import locatedJson from "../data/located.json";
import { Located } from "../models/located-models.js";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const locatedPath = path.join(__dirname, "../data/located.json");

function parseLocated(raw: any): Located {
	return {
		...raw,
		foundAt: new Date(raw.foundAt),
		createdAt: raw.createdAt ? new Date(raw.createdAt) : new Date(),
		updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : undefined,
		status: raw.status === "identified" ? "identified" : raw.status === "reunited" ? "reunited" : "unidentified"
	};
}

export const findAllLocated = async (): Promise<Located[]> => {
	return (locatedJson as any[]).map(parseLocated);
};

export const updateLocated = async (id: number, updateData: Partial<Located>): Promise<Located | null> => {
	let list: any[] = locatedJson as any[];
	const idx = list.findIndex(l => l.id === id);
	if (idx === -1) return null;
	list[idx] = {
		...list[idx],
		...updateData,
		updatedAt: new Date().toISOString(),
		foundAt: list[idx].foundAt,
		status: updateData.status === "identified" ? "identified" : updateData.status === "reunited" ? "reunited" : "unidentified"
	};
	await fs.writeFile(locatedPath, JSON.stringify(list, null, 2));
	return parseLocated(list[idx]);
};

