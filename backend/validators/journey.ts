import Joi from 'joi';

const journeySchema = Joi.object({
	journeyId: Joi.string(),
	userId: Joi.string().required(),
	vehicleId: Joi.string().required(),
	location: Joi.object({
		lat: Joi.number().required(),
		lng: Joi.number().required(),
	}).required(),
});

const schemas = {
	journeySchema,
}

export default schemas;
