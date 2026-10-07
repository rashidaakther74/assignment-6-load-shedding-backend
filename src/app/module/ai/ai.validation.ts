import { z } from "zod";

const chatValidationSchema = z.object({
	body: z.object({
		messages: z
			.array(
				z.object({
					role: z.enum(["user", "assistant"], {
						message: "Message role must be either user or assistant",
					}),
					content: z
						.string({ message: "Message content is required" })
						.trim()
						.min(1, "Message content cannot be empty")
						.max(4000, "Message content cannot exceed 4000 characters"),
				}),
			)
			.min(1, "At least one message is required")
			.max(30, "Cannot send more than 30 messages at once"),
	}),
});

export const AIValidations = {
	chatValidationSchema,
};
