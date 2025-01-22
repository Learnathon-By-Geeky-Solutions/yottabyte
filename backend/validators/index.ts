import Joi from 'joi';

const registerSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email(),
    phoneNumber: Joi.string().pattern(/^(\+8801|01)[3-9][0-9]{8}$/)
        .message('Phone number must be a valid Bangladeshi number'),
    nationalIdCard: Joi.string().length(13).pattern(/^[0-9]{13}$/)
        .messages({
            'string.pattern.base': 'National ID must be 13 digits'
        }),
    picture: Joi.string(),
    password: Joi.string()
        .min(8)
        .max(100)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        })
        .required(),
    balance: Joi.number().min(0).default(0),
}).xor('email', 'phoneNumber');

const loginSchema = Joi.object({
    email: Joi.string().email(),
    phoneNumber: Joi.string().pattern(/^(\+8801|01)[3-9][0-9]{8}$/)
        .message('Phone number must be a valid Bangladeshi number'),
    password: Joi.string()
        .min(8)
        .max(100)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        })
        .required(),
}).xor('email', 'phoneNumber');

const schemas = {
    registerSchema,
    loginSchema,
}

export default schemas;
