import { Role } from "../../../generated/prisma/enums";

export interface TUpdateUser {
    name?: string;
    phone?: string;
    areaId?: string;
    role?: Role;
}