import express from 'express';
const router = express.Router();

import controllers from '../controllers';
import middlewares from '../middlewares';
import schemas from '../validators';

router.post('/login', middlewares.validateRequest(schemas.loginSchema), async (req: express.Request, res: express.Response) => {
	try {
		const result = await controllers.login(req);
		res.status(200).json({ success: true, data: result });
	} catch (error) {
		res.status(400).json({ success: false, error: (error as Error).message || 'Authentication failed' });
	}
});

router.post('/register', middlewares.validateRequest(schemas.registerSchema), async (req: express.Request, res: express.Response) => {
	try {
		const result = await controllers.register(req);
		res.status(201).json({ success: true, data: result });
	} catch (error) {
		res.status(400).json({ success: false, error: (error as Error).message || 'Registration failed' });
	}
});

const userRoutes = {
	router,
}

export default userRoutes;
