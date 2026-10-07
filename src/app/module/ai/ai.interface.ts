export type TAIChatRole = "user" | "assistant";

export interface TAIChatMessage {
	role: TAIChatRole;
	content: string;
}

export interface TAIChatPayload {
	messages: TAIChatMessage[];
}

export interface TAIActor {
	name?: string;
	role?: string;
}

export interface TAIStats {
	totalAreas: number;
	areaNames: string[];
	totalUsers: number;
	usersByRole: {
		admin: number;
		operator: number;
		consumer: number;
	};
	totalSchedules: number;
	upcomingSchedules: number;
	complaints: {
		total: number;
		pending: number;
		inProgress: number;
		resolved: number;
	};
	payments: {
		total: number;
		pending: number;
		paid: number;
		failed: number;
		collectedAmount: number;
		pendingAmount: number;
	};
	topAreas: { name: string; users: number; schedules: number }[];
}

export interface TAIInsightBody {
	summary: string;
	recommendations: string[];
}

export interface TAIInsights extends TAIInsightBody {
	provider: "gemini" | "local";
	generatedAt: string;
	stats: TAIStats;
}

export interface TAIChatResponse {
	provider: "gemini" | "local";
	message: TAIChatMessage;
}
