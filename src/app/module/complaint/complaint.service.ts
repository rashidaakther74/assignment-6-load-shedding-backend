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

export const ComplaintService = {
    createComplaintIntoDB,
    getAllComplaintsFromDB,
    updateComplaintInDB,
    deleteComplaintFromDB,
};