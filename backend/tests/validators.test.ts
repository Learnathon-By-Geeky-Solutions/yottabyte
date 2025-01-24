import schemas from '../validators';
import process from 'node:process';

require('dotenv').config({ path: '.env.test' });

if (process.env.TEST_USER_PASSWORD == null) {
	throw new Error('TEST_USER_PASSWORD is not defined');
}

describe('Validation Schemas', () => {
	describe('registerSchema', () => {
		it('should validate a correct registration object', () => {
			const validData = {
				name: 'John Doe',
				email: 'john.doe@example.com',
				password: process.env.TEST_USER_PASSWORD,
			};
			const { error } = schemas.registerSchema.validate(validData);
			expect(error).toBeUndefined();
		});

		it('should invalidate an incorrect registration object', () => {
			const invalidData = {
				registrationNumber: 'INVALID',
				firstName: 'J',
				lastName: 'D',
				email: 'john.doe@example',
				password: 'pass',
			};
			const { error } = schemas.registerSchema.validate(invalidData);
			expect(error).toBeDefined();
		});

		it('should invalidate an object with both email and phone number', () => {
			const invalidData = {
				name: 'John Doe',
				email: 'john@doe.com',
				phoneNumber: '08012345678',
				password: process.env.TEST_USER_PASSWORD,
			};
			const { error } = schemas.registerSchema.validate(invalidData);
			expect(error).toBeDefined();
		});
		it('should validate password complexity requirements', () => {
			const invalidData = {
				name: 'John Doe',
				email: 'john@doe.com',
				password: process.env.TEST_simple_PASSWORD, // too simple
			};
			const { error } = schemas.registerSchema.validate(invalidData);
			expect(error).toBeDefined();
		});

		it('should validate phone number format', () => {
			const invalidData = {
				name: 'John Doe',
				phoneNumber: '123', // invalid format
				password: process.env.TEST_USER_PASSWORD,
			};
			const { error } = schemas.registerSchema.validate(invalidData);
			expect(error).toBeDefined();
		});
	});

	describe('loginSchema', () => {
		it('should validate a correct login object', () => {
			const validData = {
				email: 'john@doe.com',
				password: process.env.TEST_USER_PASSWORD,
			};
			const { error } = schemas.loginSchema.validate(validData);
			expect(error).toBeUndefined();
		});

		it('should invalidate an incorrect login object', () => {
			const invalidData = {
				registrationNumber: 'INVALID',
				password: process.env.TEST_USER_PASSWORD,
			};
			const { error } = schemas.loginSchema.validate(invalidData);
			expect(error).toBeDefined();
		});
	});
});
