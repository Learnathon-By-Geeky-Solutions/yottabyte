import express from 'express';
const router = express.Router();

import controllers from '../controllers/journey';
import middlewares from '../middlewares';
import schemas from '../validators/journey';

router.post('/', middlewares.validateRequest(schemas.journeySchema), async (req: express.Request, res: express.Response) => {
	try {
		const result = await controllers.triggerApi(req);
		res.status(200).json({ success: true, data: result });
	} catch (error) {
		res.status(400).json({ success: false, error: (error as Error).message || 'Authentication failed' });
	}
});

const journeyRoutes = {
	router,
}

export default journeyRoutes;
