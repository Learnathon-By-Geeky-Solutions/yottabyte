import colors from 'colors';
import * as jwt from 'jsonwebtoken';
import { NotFound, Unauthorized, BadRequest, InternalServerError } from 'http-errors';
import express from 'express';

import utils from '../utils';
import schemas from '../schemas';
import { ConfigFile } from '../types';

const userSchema = schemas.User;

const login = async (req: express.Request): Promise<object> => {
	const query = {
		'phoneNumber': req.body.phoneNumber as string,
	}

	try {
		const user = await userSchema.findOne(query);

		if (!user) {
			throw new NotFound('User not found');
		}

		const isPasswordValid = await utils.comparePassword(req.body.password, user.password);

		if (!isPasswordValid) {
			throw new Unauthorized('Invalid password');
		}

		const secret: ConfigFile = utils.readConfigFile('secret');

		if (secret.secret == null) {
			throw new Error('Secret not found');
		}

		const sign: string = jwt.sign({ username: user.phoneNumber }, secret.secret, { expiresIn: '1d' });

		if (!sign) {
			throw new InternalServerError('Failed to generate token');
		}

		return { token: sign };
	} catch (e) {
		console.error(colors.red('Failed to login'), e);
		throw e;
	}
};

const register = async (req: express.Request): Promise<object> => {
	const query = {
		'phoneNumber': req.body.phoneNumber as string,
	};

	const user = await userSchema.find(query);
	if (user.length !== 0) {
		throw new BadRequest('User already exists');
	}

	const password: string = await utils.hashPassword(req.body.password);
	const data = {
		'phoneNumber': req.body.phoneNumber as string,
		'name': req.body.name as string,
		'password': password,
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
