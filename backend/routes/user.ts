import express from 'express';
const router = express.Router();

import controllers from '../controllers';
import routes from './index';
import middlewares from '../middlewares';
import schemas from '../validators';

router.post('/login', middlewares.validateRequest(schemas.loginSchema), function (req, res) {
	routes.controllerSetup(controllers.login)(req, res);
});

router.post('/register', middlewares.validateRequest(schemas.registerSchema), function (req, res) {
	routes.controllerSetup(controllers.register)(req, res);
});

const userRoutes = {
	router,
	controllerSetup: routes.controllerSetup,
}

export default userRoutes;
