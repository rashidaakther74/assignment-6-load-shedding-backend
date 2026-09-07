import { Role } from "@prisma/client";
import { Request } from "express";

export interface TRegisterUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: Role;
}

export interface TLoginUser {
  email: string;
  password?: string;
}

export interface CustomRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: Role;
  };
}