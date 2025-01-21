import colors from 'colors';
import * as jwt from 'jsonwebtoken';

import utils from '../utils';
import schemas from '../schemas';

const userSchema = schemas.User;

const login = async (req: any) => {
	const query = {
		phoneNumber: req.body.phoneNumber,
	}

	try {
		const user = await userSchema.findOne(query);

		if (!user) {
			return { error: 'User not found' };
		}

		const isPasswordValid = await utils.comparePassword(req.body.password, user.password);

		if (!isPasswordValid) {
			// throw new Error('Invalid password');
			return { error: 'Invalid password' };
		}

		const secret: string = utils.readConfigFile('secret');
		const sign: string = jwt.sign({ username: user.phoneNumber }, secret)

		if (!sign) {
			throw new Error('Failed to sign token');
		}

		return { token: sign };
	} catch (e) {
		console.error(colors.red('Failed to login'), e);
		throw e;
	}
};

const register = async (req: any) => {
	const query = {
		phoneNumber: req.body.phoneNumber,
	};

	const user = await userSchema.find(query);
	if (user.length !== 0) {
		throw new Error('User already exists');
	}

	const password: string = await utils.hashPassword(req.body.password);
	const data = {
		phoneNumber: req.body.phoneNumber,
		name: req.body.name,
		password: password,
	};

	try {
		return await schemas.User.create(data);
	} catch (e) {
		console.error(colors.red('Failed to register'), e);
		throw e;
	}
};

const userApi = {
	login,
	register,
};

export default userApi;
