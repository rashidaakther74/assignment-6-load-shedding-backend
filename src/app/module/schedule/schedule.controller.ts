import { Request, Response } from 'express';
import { ScheduleService } from './schedule.service';

const createSchedule = async (req: Request, res: Response) => {
    try {
        const result = await ScheduleService.createSchedule(req.body);
        res.status(201).json({
            success: true,
            message: 'Schedule created successfully',
            data: result,
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || 'Failed to create schedule',
            errors: [err],
        });
    }
};

const getAllSchedules = async (req: Request, res: Response) => {
    try {
        const result = await ScheduleService.getAllSchedules();
        res.status(200).json({
            success: true,
            message: 'Schedules retrieved successfully',
            data: result,
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: 'Failed to retrieve schedules',
            errors: [err],
        });
    }
};

const getSingleSchedule = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await ScheduleService.getSingleSchedule(id as string);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Schedule not found',
                data: null,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Schedule retrieved successfully',
            data: result,
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || 'Failed to retrieve schedule',
            errors: [err],
        });
    }
};

const updateSchedule = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await ScheduleService.updateSchedule(id as string, req.body);
        res.status(200).json({
            success: true,
            message: 'Schedule updated successfully',
            data: result,
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || 'Failed to update schedule',
            errors: [err],
        });
    }
};

const deleteSchedule = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await ScheduleService.deleteSchedule(id as string);
        res.status(200).json({
            success: true,
            message: 'Schedule deleted successfully',
            data: result,
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || 'Failed to delete schedule',
            errors: [err],
        });
    }
};

export const ScheduleController = {
    createSchedule,
    getAllSchedules,
    getSingleSchedule,
    updateSchedule,
    deleteSchedule,
};