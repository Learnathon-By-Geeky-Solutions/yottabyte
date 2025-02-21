import express from 'express';

import { BadRequest } from 'http-errors';

import schemas from '../schemas/journey';


const journeySchema = schemas.Journey;

const journeyInit = async (req: express.Request): Promise<object> => {
	try {
		const journeyData = {
			userId: req.body.userId as string,
			vehicleId: req.body.vehicleId as string,
			startLocation: {
				coordinates: [req.body.location.lat, req.body.location.lng]
			},
		}
		return await journeySchema.create(journeyData);
	} catch (e) {
		console.error('Failed to create journey', e);
		throw e;
	}
};

const trigger = async (req: express.Request): Promise<object> => {
	try {
		const data = {
			userId: req.body.userId as string,
			vehicleId: req.body.vehicleId as string,
			endLocation: {
				type: 'Point',
				coordinates: [0, 0],
			},
		};

		const journeyData = await journeySchema.find(data);

		if (journeyData.length === 0) {
			return await journeyInit(req);
		}

		if (journeyData.length > 1) {
			throw new BadRequest('Multiple journeys found');
		}

		data.endLocation.coordinates = [req.body.location.lat as number, req.body.location.lng as number];
		return await journeySchema.updateOne({ _id: journeyData[0]._id }, data);
	} catch (e) {
		console.error('Failed to create journey', e);
		throw e;
	}
};


const journeyApi = {
	trigger,
};

export default journeyApi;
