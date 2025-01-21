import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
	console.error(err);

	if (err.status && err.message) {
		res.status(err.status).json({ status: 'ERROR', message: err.message });
		return;
	}

	res.status(500).json({ status: 'ERROR', message: 'Internal Server Error' });
};

export default errorHandler;
