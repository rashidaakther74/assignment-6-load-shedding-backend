import { prisma } from "../../lib/prisma";

function parseDateTime(dateStr: string, timeStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
}

const createSchedule = async (payload: any) => {
    const { zoneId, areaId, date, startTime, endTime, reason } = payload;

    const targetAreaId = zoneId || areaId;

    // Combine date + time strings into DateTime objects
    const startDateTime = parseDateTime(date, startTime);
    const endDateTime = parseDateTime(date, endTime);
    const scheduleDate = new Date(date); // Date only (midnight)

    const result = await prisma.schedule.create({
        data: {
            date: scheduleDate,
            startTime: startDateTime,
            endTime: endDateTime,
            reason,
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
    const { zoneId, areaId, date, startTime, endTime, reason, ...rest } = payload;

    const targetAreaId = zoneId || areaId;

    const data: any = { ...rest };

    if (targetAreaId) {
        data.area = { connect: { id: targetAreaId } };
    }

    // If date and startTime provided, parse them
    if (date && startTime) {
        data.date = new Date(date);
        data.startTime = parseDateTime(date, startTime);
    } else if (date) {
        data.date = new Date(date);
    }

    if (date && endTime) {
        data.endTime = parseDateTime(date, endTime);
    }

    if (reason !== undefined) {
        data.reason = reason;
    }

    const result = await prisma.schedule.update({
        where: { id },
        data,
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