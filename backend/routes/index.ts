import express = require('express');

const router = express.Router();

import controllers from '../controllers/index';

router.get('/', function (_: any, res: { connection: { end: () => any } }) {
	controllers.resetConnection(res);
});

router.get('/api/v1/ping', function (_, res) {
	controllers.ping(res);
});


const indexRoutes = {
	router,
};

export default indexRoutes;
