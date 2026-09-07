import { Request, Response } from "express";
import { CustomRequest } from "../auth/auth.interface";
import { ComplaintService } from "./complaint.service";

const createComplaint = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const result = await ComplaintService.createComplaintIntoDB({
            ...req.body,
            userId,
        });
        res.status(201).json({
            success: true,
            message: "Complaint submitted successfully!",
            data: result,
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "Failed to submit complaint",
            error: err,
        });
    }
};

const getAllComplaints = async (req: Request, res: Response) => {
    try {
        const result = await ComplaintService.getAllComplaintsFromDB();
        res.status(200).json({
            success: true,
            message: "Complaints fetched successfully!",
            data: result,
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "Failed to fetch complaints",
            error: err,
        });
    }
};

export const ComplaintController = {
    createComplaint,
    getAllComplaints,
};