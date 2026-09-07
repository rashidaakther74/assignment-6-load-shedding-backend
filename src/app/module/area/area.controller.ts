import { Request, Response } from "express";
import { AreaService } from "./area.service";

const createArea = async (req: Request, res: Response) => {
    const result = await AreaService.createArea(req.body);
    res.status(201).json({ success: true, message: "Area created successfully!", data: result });
};

const getAllAreas = async (req: Request, res: Response) => {
    const result = await AreaService.getAllAreas();
    res.status(200).json({ success: true, message: "Areas fetched successfully!", data: result });
};

const getAreaById = async (req: Request, res: Response) => {
    const result = await AreaService.getAreaById(req.params.id as string);
    res.status(200).json({ success: true, message: "Area fetched successfully!", data: result });
};

const updateArea = async (req: Request, res: Response) => {
    const result = await AreaService.updateArea(req.params.id as string, req.body);
    res.status(200).json({ success: true, message: "Area updated successfully!", data: result });
};

const deleteArea = async (req: Request, res: Response) => {
    const result = await AreaService.deleteArea(req.params.id as string);
    res.status(200).json({ success: true, message: "Area deleted successfully!", data: result });
};

export const AreaController = { createArea, getAllAreas, getAreaById, updateArea, deleteArea };