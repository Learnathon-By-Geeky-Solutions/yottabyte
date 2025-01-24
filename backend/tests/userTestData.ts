import { User } from '../types';
import { Request } from 'express';

export const validUser: User = {
	id: '1',
	phoneNumber: '1234567890',
	name: 'John Doe',
	password: 'hashedPassword',
	email: 'john@doe.com',
	picture: 'picture.jpg',
	balance: 100,
};

export const validReq: Request = {
	body: {
		phoneNumber: '+8801678910112',
		password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbddfde3d1e0',
	},
} as Request;

export const newUserReq: Request = {
	body: {
		phoneNumber: '1234567890',
		name: 'John Doe',
		password: 'password123',
	},
} as Request;
