import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.registerUserIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "User registration failed!",
      error: err,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUser(req.body, res);
    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "User login failed!",
      error: err,
    });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.getMeFromDB(req.cookies?.token);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message || "You are not authorized!",
      error: {},
    });
  }
};

const logoutUser = async (_req: Request, res: Response) => {
  try {
    AuthService.logoutUser(res);
    res.status(200).json({
      success: true,
      message: "User logged out successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "User logout failed!",
      error: err,
    });
  }
};


export const AuthController = {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  
};