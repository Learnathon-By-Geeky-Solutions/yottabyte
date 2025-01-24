import * as jwt from 'jsonwebtoken';
import * as process from 'node:process';

require('dotenv').config({ path: '.env.test' });

import userApi from '../apis/user';
import schemas from '../schemas';
import utils from '../utils';
import { ConfigFile } from '../types';

import { validUser, validReq, newUserReq } from './userTestData';

jest.mock('../schemas');
jest.mock('../utils');
jest.mock('jsonwebtoken');

describe('userApi', () => {
	describe('login', () => {
		it('should return a token for valid credentials', async () => {
			jest.spyOn(schemas.User, 'findOne').mockResolvedValue(validUser);
			jest.spyOn(utils, 'comparePassword').mockResolvedValue(true);
			jest.spyOn(utils, 'readConfigFile').mockReturnValue(<ConfigFile>{ secret: 'secret' });
			(jwt.sign as jest.Mock).mockReturnValue('token');

			const result = await userApi.login(validReq);

			expect(result).toEqual({ token: 'token' });
		});

		it('should return an error if user is not found', async () => {
			jest.spyOn(schemas.User, 'findOne').mockResolvedValue(null);

			await expect(userApi.login(validReq)).rejects.toThrow('User not found');
		});

		it('should return an error for invalid password', async () => {
			jest.spyOn(schemas.User, 'findOne').mockResolvedValue(validUser);
			jest.spyOn(utils, 'comparePassword').mockResolvedValue(false);

			await expect(userApi.login(validReq)).rejects.toThrow('Invalid password');
		});
	});

	describe('register', () => {
		it('should create a new user', async () => {
			jest.spyOn(schemas.User, 'find').mockResolvedValue([]);

			if (process.env.TEST_USER_PASSWORD == null) {
				throw new Error('TEST_USER_PASSWORD is not defined');
			}
			jest.spyOn(utils, 'hashPassword').mockResolvedValue(process.env.TEST_USER_PASSWORD);
			jest.spyOn(schemas.User, 'create').mockResolvedValue({ id: '1', ...newUserReq.body, password: process.env.TEST_USER_PASSWORD });

			const result = await userApi.register(newUserReq);

			expect(result).toEqual({ id: '1', ...newUserReq.body, password: process.env.TEST_USER_PASSWORD });
		});

		it('should throw an error if user already exists', async () => {
			jest.spyOn(schemas.User, 'find').mockResolvedValue([{}]);

			await expect(userApi.register(newUserReq)).rejects.toThrow('User already exists');
		});
	});
});
