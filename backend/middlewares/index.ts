import {Schema} from 'joi';
import {NextFunction, Request, Response} from 'express';

/**
 * Validate the request body against a schema
 * @param schema
 */
const validateRequest = (schema: Schema) => {
	return (req: Request, res: Response, next: NextFunction):void => {
		const { error } = schema.validate(req.body, { abortEarly: false });

		if (error) {
			res.status(400).json({
				status: 'ERROR',
				message: 'Validation Error',
				details: error.details.map(detail => detail.message),
			});
		}
		next();
	};
};

const middlewares = {
	validateRequest,
};

export default middlewares;
