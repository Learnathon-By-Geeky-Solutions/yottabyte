import Joi from 'joi';

const registrationNumberSchema = Joi.string()
	.pattern(/^([A-Z]{2})-([A-Z])-([0-9]{2})-([0-9]{2})-([0-9]{6})$/)
	.required()
	.messages({
		'string.pattern.base': 'Registration number must be in the format "XX-X-XX-XX-XXXXXX".\nExample: "CS-D-90-24-124890".',
		'string.empty': 'Registration number is required.',
	});

const registerSchema = Joi.object({
	registrationNumber: registrationNumberSchema,
	firstName: Joi.string().min(2).required(),
	lastName: Joi.string().min(2).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).alphanum().required(),
});

const loginSchema = Joi.object({
	registrationNumber: registrationNumberSchema,
	password: Joi.string().min(6).required(),
});

const schemas = {
	registerSchema,
	loginSchema,
}

export default schemas;
