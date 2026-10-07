import type { Response } from "express";
import type { CustomRequest } from "../../middleware/auth";
import type { TAIChatPayload } from "./ai.interface";
import { AIService } from "./ai.service";

const getInsights = async (_req: CustomRequest, res: Response) => {
	const result = await AIService.getInsights();
	res.status(200).json({
		success: true,
		message: "AI insights fetched successfully!",
		data: result,
	});
};

const chat = async (req: CustomRequest, res: Response) => {
	const user = req.user as { name?: string; role?: string } | undefined;

	const result = await AIService.chat(req.body as TAIChatPayload, {
		name: user?.name,
		role: user?.role,
	});

	res.status(200).json({
		success: true,
		message: "AI assistant replied successfully!",
		data: result,
	});
};

export const AIController = {
	getInsights,
	chat,
};
