import userApi from '../apis/user';
import schemas from '../schemas';
import utils from '../utils';
import * as jwt from 'jsonwebtoken';

jest.mock('../schemas');
jest.mock('../utils');
jest.mock('jsonwebtoken');

describe('userApi', () => {
    describe('login', () => {
        it('should return a token for valid credentials', async () => {
            const req = {
                body: {
                    phoneNumber: '1234567890',
                    password: 'password123',
                },
            };

            const user = {
                phoneNumber: '1234567890',
                password: 'hashedPassword',
            };

            jest.spyOn(schemas.User, 'findOne').mockResolvedValue(user);
            jest.spyOn(utils, 'comparePassword').mockResolvedValue(true);
            jest.spyOn(utils, 'readConfigFile').mockReturnValue('secret');
            (jwt.sign as jest.Mock).mockReturnValue('token');

            const result = await userApi.login(req);

            expect(result).toEqual({ token: 'token' });
        });

        it('should return an error if user is not found', async () => {
            const req = {
                body: {
                    phoneNumber: '1234567890',
                    password: 'password123',
                },
            };

            jest.spyOn(schemas.User, 'findOne').mockResolvedValue(null);

            const result = await userApi.login(req);

            expect(result).toEqual({ error: 'User not found' });
        });

        it('should return an error for invalid password', async () => {
            const req = {
                body: {
                    phoneNumber: '1234567890',
                    password: 'password123',
                },
            };

            const user = {
                phoneNumber: '1234567890',
                password: 'hashedPassword',
            };

            jest.spyOn(schemas.User, 'findOne').mockResolvedValue(user);
            jest.spyOn(utils, 'comparePassword').mockResolvedValue(false);

            const result = await userApi.login(req);

            expect(result).toEqual({ error: 'Invalid password' });
        });
    });

    describe('register', () => {
        it('should create a new user', async () => {
            const req = {
                body: {
                    phoneNumber: '1234567890',
                    name: 'John Doe',
                    password: 'password123',
                },
            };

            jest.spyOn(schemas.User, 'find').mockResolvedValue([]);
            jest.spyOn(utils, 'hashPassword').mockResolvedValue('hashedPassword');

            // @ts-ignore
            jest.spyOn(schemas.User, 'create').mockResolvedValue({ id: '1', ...req.body, password: 'hashedPassword' });

            const result = await userApi.register(req);

            expect(result).toEqual({ id: '1', ...req.body, password: 'hashedPassword' });
        });

        it('should throw an error if user already exists', async () => {
            const req = {
                body: {
                    phoneNumber: '1234567890',
                    name: 'John Doe',
                    password: 'password123',
                },
            };

            jest.spyOn(schemas.User, 'find').mockResolvedValue([{}]);

            await expect(userApi.register(req)).rejects.toThrow('User already exists');
        });
    });
});
