import express from "express";

import { PaymentController } from "./payment.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    PaymentController.handleWebhook
);


router.get(
    "/my-payments",
    auth("CONSUMER", "ADMIN"),
    PaymentController.getMyPayments
);


router.get(
    "/",
    auth("ADMIN"),
    PaymentController.getAllPayments
);

router.post(
    "/create-checkout-session",
    auth("CONSUMER", "ADMIN"),
    PaymentController.createCheckoutSession
);

router.post(
    "/",
    auth("CONSUMER", "ADMIN"),
    PaymentController.createPaymentRecord
);

export const PaymentRoutes = router;