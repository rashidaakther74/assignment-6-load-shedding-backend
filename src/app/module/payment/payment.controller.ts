import { Request, Response } from "express";
import Stripe from "stripe";
import { PaymentService } from "./payment.service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const { amount } = req.body;
        const userId = (req as any).user.id;
        const result = await PaymentService.createCheckoutSession(amount, userId);

        res.status(200).json({
            success: true,
            message: "Checkout session created successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "Failed to create checkout session",
        });
    }
};

const createPaymentRecord = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { amount, trxId } = req.body;

        const result = await PaymentService.createPaymentRecord({
            userId,
            amount,
            trxId,
        });

        res.status(200).json({
            success: true,
            message: "Payment recorded successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "Failed to record payment",
        });
    }
};

const getAllPayments = async (req: Request, res: Response) => {
    try {
        const result = await PaymentService.getAllPayments();
        res.status(200).json({
            success: true,
            message: "Payments retrieved successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "Failed to fetch payments",
        });
    }
};

const getMyPayments = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const result = await PaymentService.getMyPayments(userId);

        res.status(200).json({
            success: true,
            message: "My payments retrieved successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "Failed to fetch my payments",
        });
    }
};

const handleWebhook = async (req: Request, res: Response) => {
    try {
        // Postman testing-এর জন্য সরাসরি req.body ব্যবহার করা হচ্ছে
        const event = req.body;

        await PaymentService.handleWebhook(event);

        res.status(200).json({ received: true });
    } catch (err: any) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};

export const PaymentController = {
    createCheckoutSession,
    createPaymentRecord,
    getAllPayments,
    getMyPayments,
    handleWebhook,
};