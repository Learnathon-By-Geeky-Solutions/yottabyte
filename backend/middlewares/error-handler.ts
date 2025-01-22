// middlewares/error-handler.ts
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpError } from 'http-errors';

interface ExtendedHttpError extends HttpError {
	details?: string[];
}

interface AppError extends Error {
	status?: number;
	code?: string;
	details?: string[];
}

const errorHandler: ErrorRequestHandler = (
	err: AppError,
	_req: Request,
	res: Response,
	_next: NextFunction
): void => {
	console.error('Error', {
		message: err.message,
		code: err.code,
	});

	if (err.status && err.message) {
		const response: any = {
			status: 'ERROR',
			message: err.message,
		};

		if (err.details) {
			response.details = err.details;
		}

		res.status(err.status).json(response);
		return;
	}

	res.status(500).json({ status: 'ERROR', message: 'Internal Server Error' });
};

export default errorHandler;
