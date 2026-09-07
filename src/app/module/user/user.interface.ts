import { Role } from "@prisma/client";

export interface TUpdateUser {
    name?: string;
    phone?: string;
    areaId?: string;
    role?: Role;
}