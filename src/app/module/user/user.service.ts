import { prisma } from "../../lib/prisma";
import { TUpdateUser } from "./user.interface";

const getAllUsersFromDB = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
            areaId: true,
            createdAt: true,
        },
    });
};

const getUserByIdFromDB = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
            areaId: true,
            createdAt: true,
        },
    });
};

const updateUserIntoDB = async (id: string, payload: TUpdateUser) => {
    return await prisma.user.update({
        where: { id },
        data: payload,
    });
};

export const UserService = {
    getAllUsersFromDB,
    getUserByIdFromDB,
    updateUserIntoDB,
};