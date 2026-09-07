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

export const ComplaintService = {
    createComplaintIntoDB,
    getAllComplaintsFromDB,
};