import { ComplaintStatus } from "../../../generated/prisma/enums";

export interface TCreateComplaint {
    userId: string;
    subject: string;
    description: string;
    status?: ComplaintStatus; 
}