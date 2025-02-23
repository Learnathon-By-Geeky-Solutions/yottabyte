import Joi from 'joi';

const transactionSchema = Joi.object({
	journeyId: Joi.string(),
	userId: Joi.string().required(),
	transactionType: Joi.string().valid('credit', 'debit').required(),
	amount: Joi.number().required().min(10),
	message: Joi.string().required(),
});

const schemas = {
	transactionSchema,
}

export default schemas;
