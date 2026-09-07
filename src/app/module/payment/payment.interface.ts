import { PaymentStatus } from "../../../generated/prisma/enums";


export interface TCreatePayment {
    userId: string;
    amount: number;
    transactionId: string; 
    status?: PaymentStatus;
}