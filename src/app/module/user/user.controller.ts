import { Request, Response } from "express";
import { UserService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
    const result = await UserService.getAllUsersFromDB();
    res.status(200).json({ success: true, message: "Users fetched successfully!", data: result });
};

const getUserById = async (req: Request, res: Response) => {
    const result = await UserService.getUserByIdFromDB(req.params.id as string);
    res.status(200).json({ success: true, message: "User fetched successfully!", data: result });
};

const updateUser = async (req: Request, res: Response) => {
    const result = await UserService.updateUserIntoDB(req.params.id as string, req.body);
    res.status(200).json({ success: true, message: "User updated successfully!", data: result });
};

export const UserController = { getAllUsers, getUserById, updateUser };