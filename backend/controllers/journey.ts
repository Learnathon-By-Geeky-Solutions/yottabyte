import { Request } from 'express';

import api from '../apis/journey';

const triggerApi = (req: Request): Promise<object> => {
	return api.trigger(req);
};

const controllers = { triggerApi };

export default controllers;
