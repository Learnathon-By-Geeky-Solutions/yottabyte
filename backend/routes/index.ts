import express = require('express');

const router = express.Router();

import controllers from '../controllers/index';

router.get('/', function (_: any, res: { connection: { end: () => any } }) {
	controllers.resetConnection(res);
});

router.get('/api/v1/ping', function (_, res) {
	controllers.ping(res);
});

/**
 * @function controllerSetup
 * @description This function is used to set up the controller
 * @param controller
 */
const controllerSetup = (controller: any) => {
	return async (req: any, res: any) => {
		try {
			const result = await controller(req);
			res.status(200).json({ status: 'OK', data: result });
		} catch (error: any) {
			res.status(500).json({ status: 'ERROR', message: error.message });
		}
	};
};

const indexRoutes = {
	router,
	controllerSetup,
};

export default indexRoutes;
