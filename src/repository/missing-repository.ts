


import missingJson from "../data/missing.json";
import { Missing } from "../models/missing-models";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const missingPath = path.join(__dirname, "../data/missing.json");

function parseMissing(raw: any): Missing {
    return {
        ...raw,
        date: new Date(raw.date),
        createdAt: raw.createdAt ? new Date(raw.createdAt) : new Date(),
        updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : undefined,
        status: raw.status === "found" ? "found" : "missing"
    };
}

export const findAllMissing = async (): Promise<Missing[]> => {
    return (missingJson as any[]).map(parseMissing);
};

export const updateMissing = async (id: number, updateData: Partial<Missing>): Promise<Missing | null> => {
    let list: any[] = missingJson as any[];
    const idx = list.findIndex(m => m.id === id);
    if (idx === -1) return null;
    list[idx] = {
        ...list[idx],
        ...updateData,
        updatedAt: new Date().toISOString(),
        date: list[idx].date,
        status: updateData.status === "found" ? "found" : "missing"
    };
    await fs.writeFile(missingPath, JSON.stringify(list, null, 2));
    return parseMissing(list[idx]);
};

export const putMissing = async (newData: Missing): Promise<Missing> => {
    let list: any[] = missingJson as any[];
    const newId = Math.max(...list.map(m => m.id), 0) + 1;
    const newMissing = {
        ...newData,
        id: newId,
        createdAt: new Date().toISOString(),
        status: "missing"
    };
    list.push(newMissing);
    await fs.writeFile(missingPath, JSON.stringify(list, null, 2));
    return parseMissing(newMissing);
};