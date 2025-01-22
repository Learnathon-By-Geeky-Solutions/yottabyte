// backend/tests/userApi.test.ts

import userApi from '../apis/user';
import schemas from '../schemas';
import utils from '../utils';
import * as jwt from 'jsonwebtoken';

jest.mock('../schemas');
jest.mock('../utils');
jest.mock('jsonwebtoken');

const validUser = {
	phoneNumber: '1234567890',
	password: 'hashedPassword',
};

const validReq = {
	body: {
		phoneNumber: '1234567890',
		password: 'password123',
	},
};

const newUserReq = {
	body: {
		phoneNumber: '1234567890',
		name: 'John Doe',
		password: 'password123',
	},
};

describe('userApi', () => {
	describe('login', () => {
		it('should return a token for valid credentials', async () => {
			jest.spyOn(schemas.User, 'findOne').mockResolvedValue(validUser);
			jest.spyOn(utils, 'comparePassword').mockResolvedValue(true);
			jest.spyOn(utils, 'readConfigFile').mockReturnValue('secret');
			(jwt.sign as jest.Mock).mockReturnValue('token');

			const result = await userApi.login(validReq);

			expect(result).toEqual({ token: 'token' });
		});

		it('should return an error if user is not found', async () => {
			jest.spyOn(schemas.User, 'findOne').mockResolvedValue(null);

			const result = await userApi.login(validReq);

			expect(result).toEqual({ error: 'User not found' });
		});

		it('should return an error for invalid password', async () => {
			jest.spyOn(schemas.User, 'findOne').mockResolvedValue(validUser);
			jest.spyOn(utils, 'comparePassword').mockResolvedValue(false);

			const result = await userApi.login(validReq);

			expect(result).toEqual({ error: 'Invalid password' });
		});
	});

	describe('register', () => {
		it('should create a new user', async () => {
			jest.spyOn(schemas.User, 'find').mockResolvedValue([]);
			jest.spyOn(utils, 'hashPassword').mockResolvedValue('hashedPassword');
			jest.spyOn(schemas.User, 'create').mockResolvedValue({ id: '1', ...newUserReq.body, password: 'hashedPassword' });

			const result = await userApi.register(newUserReq);

			expect(result).toEqual({ id: '1', ...newUserReq.body, password: 'hashedPassword' });
		});

		it('should throw an error if user already exists', async () => {
			jest.spyOn(schemas.User, 'find').mockResolvedValue([{}]);

			await expect(userApi.register(newUserReq)).rejects.toThrow('User already exists');
		});
	});
});
