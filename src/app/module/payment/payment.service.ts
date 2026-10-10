import Stripe from "stripe";
import { prisma } from "../../lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// এখানে আপনার ফ্রন্টএন্ডের Vercel-এর আসল লাইভ লিংকটি বসান (শেষে কোনো / দেবেন না)
const FRONTEND_URL = process.env.CLIENT_URL || "https://আপনার-প্রজেক্টের-লিংক.vercel.app";

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
   
        success_url: `${FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&amount=${amount}`,
        cancel_url: `${FRONTEND_URL}/dashboard`,
    });

    // পেমেন্ট সেশন তৈরির সাথে সাথেই ডেটাবেসে রেকর্ড সেভ করে রাখা হচ্ছে 
    // (যাতে Webhook ছাড়াও My Payments এবং Admin Dashboard-এ সাথে সাথে পেমেন্ট দেখায়)
    await prisma.payment.create({
        data: {
            userId: userId,
            amount: Number(amount),
            trxId: session.id,
            status: "PAID",
        } as any,
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
            amount: Number(payload.amount),
            trxId: payload.trxId,
            status: "PAID",
        } as any,
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
                    status: "PAID",
                },
                create: {
                    userId: userId,
                    trxId: trxId,
                    amount: session.amount_total ? session.amount_total / 100 : 0,
                    status: "PAID",
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