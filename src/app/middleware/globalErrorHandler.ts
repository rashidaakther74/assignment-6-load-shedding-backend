import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	let statusCode = 500;
	let message = err.message || 'Something went wrong!';
	let errorSources: any[] = [];

	if (err instanceof ZodError) {
		statusCode = 400;
		message = 'Validation Error';
		errorSources = err.issues.map((issue) => ({
			path: issue.path[issue.path.length - 1],
			message: issue.message,
		}));
	}

	return res.status(statusCode).json({
		success: false,
		message,
		errors: errorSources,
	});
};