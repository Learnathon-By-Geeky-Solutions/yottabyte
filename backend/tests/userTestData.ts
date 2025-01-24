import { User } from '../types';
import { Request } from 'express';
import * as process from 'node:process';

require('dotenv').config({ path: '.env.test' });

if (process.env.TEST_USER_PASSWORD == null) {
	throw new Error('TEST_USER_PASSWORD is not defined');
}

export const validUser: User = {
	id: '1',
	phoneNumber: '1234567890',
	name: 'John Doe',
	password: process.env.TEST_USER_PASSWORD,
	email: 'john@doe.com',
	picture: 'picture.jpg',
	balance: 100,
};

export const validReq = {
	body: {
		phoneNumber: '+8801678910112',
		password: process.env.TEST_USER_PASSWORD
	},
} satisfies Partial<Request>;

export const newUserReq = {
	body: {
		phoneNumber: '+8801234567890',
		name: 'John Doe',
		password: process.env.TEST_USER_PASSWORD
	},
} satisfies Partial<Request>
