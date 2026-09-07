import { z } from 'zod';

const createScheduleValidationSchema = z.object({
    body: z.object({
        zoneId: z.string({ message: 'Zone ID is required' }).min(1, 'Zone ID cannot be empty'),
        date: z.string({ message: 'Date is required' }).min(1, 'Date cannot be empty'),
        startTime: z.string({ message: 'Start time is required' }).min(1, 'Start time cannot be empty'),
        endTime: z.string({ message: 'End time is required' }).min(1, 'End time cannot be empty'),
    }),
});

const updateScheduleValidationSchema = z.object({
    body: z.object({
        zoneId: z.string().optional(),
        date: z.string().optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
    }),
});

export const ScheduleValidations = {
    createScheduleValidationSchema,
    updateScheduleValidationSchema,
};