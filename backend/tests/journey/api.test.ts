import request from 'supertest';
import express from 'express';
import journeyApi from '../../apis/journey';
import journeySchema from '../../schemas/journey';

const app = express();
app.use(express.json());
app.post('/journey', async (req, res) => {
	try {
		const journey = await journeyApi.trigger(req);
		res.status(201).send(journey);
	} catch (e: any) {
		res.status(500).send(e.message);
	}
});

describe('Journey Initialization', () => {
	jest.setTimeout(30000); // Increase timeout to 30 seconds for all tests in this block

	it('creates a journey successfully with valid data', async () => {
		const response = await request(app)
			.post('/journey')
			.send({
				userId: '67b0a1ae0b41688596ee61e0',
				vehicleId: '678ef8a55d4d72eac90e72a4',
				location: { lat: 40.7128, lng: -74.0060 }
			});
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('_id');
		expect(response.body).toHaveProperty('userId', 'user123');
		expect(response.body).toHaveProperty('vehicleId', 'vehicle123');
		expect(response.body.startLocation.coordinates).toEqual([40.7128, -74.0060]);
	});

	it('fails to create a journey with missing userId', async () => {
		const response = await request(app)
			.post('/journey')
			.send({
				vehicleId: '678ef8a55d4d72eac90e72a4',
				location: { lat: 40.7128, lng: -74.0060 }
			});
		expect(response.status).toBe(500);
		expect(response.text).toContain('Failed to create journey');
	});

	it('fails to create a journey with missing vehicleId', async () => {
		const response = await request(app)
			.post('/journey')
			.send({
				userId: '67b0a1ae0b41688596ee61e0',
				location: { lat: 40.7128, lng: -74.0060 }
			});
		expect(response.status).toBe(500);
		expect(response.text).toContain('Failed to create journey');
	});

	it('fails to create a journey with missing location', async () => {
		const response = await request(app)
			.post('/journey')
			.send({
				userId: '67b0a1ae0b41688596ee61e0',
				vehicleId: '678ef8a55d4d72eac90e72a4'
			});
		expect(response.status).toBe(500);
		expect(response.text).toContain('Failed to create journey');
	});
});
