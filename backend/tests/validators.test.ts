import schemas from '../validators';

describe('Validation Schemas', () => {
	describe('registerSchema', () => {
		it('should validate a correct registration object', () => {
			const validData = {
				name: 'John Doe',
				email: 'john.doe@example.com',
				password: 'password123',
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
				password: 'password123',
			};
			const { error } = schemas.registerSchema.validate(invalidData);
			expect(error).toBeDefined();
		});
		it('should validate password complexity requirements', () => {
			const invalidData = {
				name: 'John Doe',
				email: 'john@doe.com',
				password: '123', // too simple
			};
			const { error } = schemas.registerSchema.validate(invalidData);
			expect(error).toBeDefined();
		});

		it('should validate phone number format', () => {
			const invalidData = {
				name: 'John Doe',
				phoneNumber: '123', // invalid format
				password: 'password123',
			};
			const { error } = schemas.registerSchema.validate(invalidData);
			expect(error).toBeDefined();
		});
	});

	describe('loginSchema', () => {
		it('should validate a correct login object', () => {
			const validData = {
				email: 'john@doe.com',
				password: 'password123',
			};
			const { error } = schemas.loginSchema.validate(validData);
			expect(error).toBeUndefined();
		});

		it('should invalidate an incorrect login object', () => {
			const invalidData = {
				registrationNumber: 'INVALID',
				password: 'pass',
			};
			const { error } = schemas.loginSchema.validate(invalidData);
			expect(error).toBeDefined();
		});
	});
});
