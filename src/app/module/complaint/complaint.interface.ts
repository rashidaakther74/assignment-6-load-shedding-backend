import { ComplaintStatus } from "@prisma/client";

export interface TCreateComplaint {
    userId: string;
    subject: string;
    description: string;
    status?: ComplaintStatus; 
}