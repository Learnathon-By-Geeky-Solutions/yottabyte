import { Request, Response } from 'express';

import api from '../apis/index';


const resetConnection = (res: { connection: { end: () => void } }): void => {
	res.connection.end(); // Reset the connection pool
};

const ping = (res: Response) : void => {
	res.status(200).send('pong!');
};

const login = (req: Request) : Promise<object> => {
	return api.user.login(req);
};

const register = (req: Request) : Promise<object> => {
	return api.user.register(req);
};

const controllers = {
	resetConnection,
	ping,
	login,
	register,
};

export default controllers;
