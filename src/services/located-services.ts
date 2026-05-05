import * as httphelper from "../utils/http-helper.js";
import * as repository from "../repository/located-repository.js";

export const getLocatedService = async (name: string) => {
	const data = await repository.findAllLocated();
	let result = data;
	if (name) {
		result = data.filter((l: any) => l.name && l.name.toLowerCase().includes(name.toLowerCase()));
	}
	if (result.length > 0) {
		return await httphelper.ok(result);
	} else {
		return await httphelper.badRequest();
	}
};

export const getAllLocatedService = async () => {
	const data = await repository.findAllLocated();
	if (data) {
		return await httphelper.ok(data);
	} else {
		return await httphelper.badRequest();
	}
};

export const updateLocatedService = async (id: number, updateData: any) => {
	const updated = await repository.updateLocated(id, updateData);
	if (updated) {
		return await httphelper.ok(updated);
	} else {
		return await httphelper.badRequest();
	}
};

