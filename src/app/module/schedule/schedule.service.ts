import { prisma } from "../../lib/prisma";


const createSchedule = async (payload: any) => {
    const { zoneId, areaId, date, startTime, endTime, ...rest } = payload;

    const targetAreaId = zoneId || areaId;

    const result = await prisma.schedule.create({
        data: {
            ...rest,
            date,
            startTime,
            endTime,
            area: {
                connect: {
                    id: targetAreaId,
                },
            },
        },
        include: {
            area: true,
        },
    });

    return result;
};

const getAllSchedules = async () => {
    const result = await prisma.schedule.findMany({
        include: {
            area: true,
        },
    });
    return result;
};

const getSingleSchedule = async (id: string) => {
    const result = await prisma.schedule.findUnique({
        where: { id },
        include: {
            area: true,
        },
    });
    return result;
};

const updateSchedule = async (id: string, payload: any) => {
    const result = await prisma.schedule.update({
        where: { id },
        data: payload,
        include: {
            area: true,
        },
    });
    return result;
};

const deleteSchedule = async (id: string) => {
    const result = await prisma.schedule.delete({
        where: { id },
    });
    return result;
};

export const ScheduleService = {
    createSchedule,
    getAllSchedules,
    getSingleSchedule,
    updateSchedule,
    deleteSchedule,
};