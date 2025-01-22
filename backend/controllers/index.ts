import api from '../apis/index';

const resetConnection = (res: { connection: { end: () => any } }) => {
	res.connection && res.connection.end(); // Reset the connection pool
};

const ping = (res: any) => {
	res.status(200).send('pong!');
};

const login = (req: any) => {
	return api.user.login(req);
};

const register = (req: any) => {
	return api.user.register(req);
};

const controllers = {
	resetConnection,
	ping,
	login,
	register,
};

export default controllers;
