import { PaymentStatus } from "@prisma/client";

export interface TCreatePayment {
    userId: string;
    amount: number;
    transactionId: string; 
    status?: PaymentStatus;
}