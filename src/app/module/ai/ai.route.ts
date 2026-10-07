import express from "express";

import auth from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { AIController } from "./ai.controller";
import { AIValidations } from "./ai.validation";

const router = express.Router();

// ADMIN & OPERATOR: AI generated dashboard insights
router.get("/insights", auth("ADMIN", "OPERATOR"), AIController.getInsights);

// ADMIN, OPERATOR & CONSUMER: AI assistant chat
router.post(
	"/chat",
	auth("ADMIN", "OPERATOR", "CONSUMER"),
	validateRequest(AIValidations.chatValidationSchema),
	AIController.chat,
);

export const AIRoutes = router;
