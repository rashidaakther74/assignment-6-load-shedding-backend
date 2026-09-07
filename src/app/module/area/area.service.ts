import { prisma } from "../../lib/prisma";
import { TCreateArea, TUpdateArea } from "./area.interface";

const createArea = async (payload: TCreateArea) => {
    return await prisma.area.create({
        data: payload,
    });
};

const getAllAreas = async () => {
    return await prisma.area.findMany({
        include: { users: true, schedules: true },
    });
};

const getAreaById = async (id: string) => {
    return await prisma.area.findUnique({
        where: { id },
    });
};

const updateArea = async (id: string, payload: TUpdateArea) => {
    return await prisma.area.update({
        where: { id },
        data: payload,
    });
};

const deleteArea = async (id: string) => {
    return await prisma.area.delete({
        where: { id },
    });
};

export const AreaService = {
    createArea,
    getAllAreas,
    getAreaById,
    updateArea,
    deleteArea,
};