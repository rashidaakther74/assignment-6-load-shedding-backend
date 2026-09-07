
import Stripe from "stripe";
import { prisma } from "../../lib/prisma";
import { PaymentStatus } from "../../../generated/prisma/enums";

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
        success_url: "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}",
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
        },
    });
    return result;
};


const getAllPayments = async () => {
    return await prisma.payment.findMany({
        include: {
            user: {
                select: { id: true, name: true, email: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};

const getMyPayments = async (userId: string) => {
    return await prisma.payment.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
};


const handleWebhook = async (event: Stripe.Event) => {
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.client_reference_id;
        const amount = (session.amount_total || 0) / 100;
        const trxId = session.id;

        if (userId) {
            await prisma.payment.upsert({
                where: {
                    trxId: trxId,
                },
                update: {
                    status: PaymentStatus.PAID, 
                },
                create: {
                    userId: userId,
                    trxId: trxId,
                    amount: session.amount_total ? session.amount_total / 100 : 0,
                    status: PaymentStatus.PAID, 
                },
            });
        }
        }
        }

export const PaymentService = {
    createCheckoutSession,
    createPaymentRecord,
    getAllPayments,
    getMyPayments,
    handleWebhook,
};