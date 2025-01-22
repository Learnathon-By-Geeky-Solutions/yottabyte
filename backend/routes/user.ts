import express from 'express';
const router = express.Router();

import controllers from '../controllers';
import middlewares from '../middlewares';
import schemas from '../validators';

router.post('/login', middlewares.validateRequest(schemas.loginSchema), async (req, res) => {
	const result = await controllers.login(req);
	res.status(200).json({ status: 'OK', data: result });
});

router.post('/register', middlewares.validateRequest(schemas.registerSchema), async (req, res) => {
	const result = await controllers.register(req);
	res.status(200).json({ status: 'OK', data: result });
});

const userRoutes = {
	router,
}

export default userRoutes;
