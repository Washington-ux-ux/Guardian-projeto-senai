
import * as httphelper from "../utils/http-helper";
import * as repository from "../repository/missing-repository";

export const getMissingService = async (name: string) => {
    const data = await repository.findAllMissing();
    let result = data;
    if (name) {
        result = data.filter((m: any) => m.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (result.length > 0) {
        return await httphelper.ok(result);
    } else {
        return await httphelper.badRequest();
    }
};

export const getAllMissingService = async () => {
    const data = await repository.findAllMissing();
    if (data) {
        return await httphelper.ok(data);
    } else {
        return await httphelper.badRequest();
    }
};

export const updateMissingService = async (id: number, updateData: any) => {
    const updated = await repository.updateMissing(id, updateData);
    if (updated) {
        return await httphelper.ok(updated);
    } else {
        return await httphelper.badRequest();
    }
};

export const putMissingService = async (newData: any) => {
    const created = await repository.putMissing(newData);
    if (created) {
        return await httphelper.created();
    } else {
        return await httphelper.badRequest();
    }
};