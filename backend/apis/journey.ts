import express from 'express';
import { BadRequest } from 'http-errors';
import moment from 'moment-timezone';

import schemas from '../schemas/journey';


const journeySchema = schemas.Journey;

/**
 * Initialize a journey
 * Description: Create a new journey with the start location
 * @param req object- userId, vehicleId, location
 * @returns object- journey data
 */
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

/**
 * Trigger a journey
 * Description: Start or end a journey
 * 				If no journey found, create a new one
 * 				If journey found, end the journey
 * @param req object- userId, vehicleId, location
 * @returns object- journey data
 */
const trigger = async (req: express.Request): Promise<object> => {
	try {
		const data = {
			userId: req.body.userId as string,
			vehicleId: req.body.vehicleId as string,
			endLocation: {
				type: 'Point',
				coordinates: [0, 0],
			},
			endTime: '-1',
		};

		const journeyData = await journeySchema.find(data);

		// If no journey found, create a new one
		if (journeyData.length === 0) {
			return await journeyInit(req);
		}

		if (journeyData.length > 1) {
			throw new BadRequest('Multiple journeys found');
		}

		/**
		 * If journey found, end the journey
		 * Update the end location
		 * Update the end time
		 * TODO: Bill calculation
		 */
		data.endLocation.coordinates = [req.body.location.lat as number, req.body.location.lng as number];
		data.endTime = moment().tz('Asia/Dhaka').format();
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
