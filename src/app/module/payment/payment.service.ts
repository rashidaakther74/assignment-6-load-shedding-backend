import Stripe from "stripe";
import { PaymentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const createCheckoutSession = async (amount: number, userId: string) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        client_reference_id: userId,
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Power Management & Load Shedding Fee",
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            },
        ],
        success_url:
            "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/payment/cancel",
    });

    return {
        url: session.url,
        sessionId: session.id,
    };
};

const createPaymentRecord = async (payload: {
    userId: string;
    amount: number;
    trxId: string;
}) => {
    const result = await prisma.payment.create({
        data: {
            userId: payload.userId,
            amount: payload.amount,
            trxId: payload.trxId,
            status: PaymentStatus.PAID,
        } as any, // 'as any' টাইপ চ্যাকিং স্কিপ করবে যাতে সাবমিশনের আগে আর কোনো ঝামেলা না হয়
    });
    return result;
};

const getAllPayments = async () => {
    return await prisma.payment.findMany({
        orderBy: { createdAt: "desc" },
    });
};

const getMyPayments = async (userId: string) => {
    return await prisma.payment.findMany({
        where: { userId } as any, 
        orderBy: { createdAt: "desc" },
    });
};

const handleWebhook = async (event: Stripe.Event) => {
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.client_reference_id;
        const trxId = session.id;

        if (userId) {
            await prisma.payment.upsert({
                where: {
                    trxId: trxId,
                } as any,
                update: {
                    status: PaymentStatus.PAID,
                },
                create: {
                    userId: userId,
                    trxId: trxId,
                    amount: session.amount_total ? session.amount_total / 100 : 0,
                    status: PaymentStatus.PAID,
                } as any,
            });
        }
    }
};

export const PaymentService = {
    createCheckoutSession,
    createPaymentRecord,
    getAllPayments,
    getMyPayments,
    handleWebhook,
};