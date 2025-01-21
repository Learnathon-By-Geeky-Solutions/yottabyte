import Joi from 'joi';

const registerSchema = Joi.object({
	name: Joi.string().min(2).required(),
	email: Joi.string().email(),
	phoneNumber: Joi.string().min(11),
	nationalIdCard: Joi.string().min(13).max(13),
	picture: Joi.string(),
	password: Joi.string().min(8).alphanum().required(),
	balance: Joi.number().min(0).default(0),
}).xor('email', 'phoneNumber');

const loginSchema = Joi.object({
	email: Joi.string().email(),
	phoneNumber: Joi.string().min(11).max(11),
	password: Joi.string().min(6).required(),
}).xor('email', 'phoneNumber');

const schemas = {
	registerSchema,
	loginSchema,
}

export default schemas;
