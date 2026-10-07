import { prisma } from "../../lib/prisma";
import { TCreateComplaint } from "./complaint.interface";

const createComplaintIntoDB = async (payload: TCreateComplaint) => {
    return await prisma.complaint.create({
        data: payload,
    });
};

const getAllComplaintsFromDB = async () => {
    return await prisma.complaint.findMany({
        include: { user: true },
    });
};

const updateComplaintInDB = async (id: string, payload: Partial<TCreateComplaint>) => {
    return await prisma.complaint.update({
        where: { id },
        data: payload,
        include: { user: true },
    });
};

const deleteComplaintFromDB = async (id: string) => {
    return await prisma.complaint.delete({
        where: { id },
    });
};

const deleteMyComplaintFromDB = async (id: string, userId: string) => {
    return await prisma.complaint.delete({
        where: { id, userId },
    });
};

const getMyComplaintsFromDB = async (userId: string) => {
    return await prisma.complaint.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
};

export const ComplaintService = {
    createComplaintIntoDB,
    getAllComplaintsFromDB,
    getMyComplaintsFromDB,
    updateComplaintInDB,
    deleteComplaintFromDB,
    deleteMyComplaintFromDB,
};