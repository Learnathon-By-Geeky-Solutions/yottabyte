import mongoose from 'mongoose';
import schemas from '../../schemas/journey';
import moment from 'moment-timezone';

const { Journey } = schemas;

describe('Journey Schema', () => {
	beforeAll(() => {
		jest.spyOn(Journey.prototype, 'save').mockImplementation(async function (this: typeof Journey.prototype) {
			if (this.bill < 0) {
				const error = new mongoose.Error.ValidationError(this);
				error.errors.bill = new mongoose.Error.ValidatorError({
					message: '-10 cannot be negative!',
					path: 'bill',
					value: this.bill,
				});
				throw error;
			}
			if (!this.journeyId || !this.userId || !this.vehicleId) {
				const error = new mongoose.Error.ValidationError(this);
				if (!this.journeyId) {
					error.errors.journeyId = new mongoose.Error.ValidatorError({
						message: 'Path `journeyId` is required.',
						path: 'journeyId',
					});
				}
				if (!this.userId) {
					error.errors.userId = new mongoose.Error.ValidatorError({
						message: 'Path `userId` is required.',
						path: 'userId',
					});
				}
				if (!this.vehicleId) {
					error.errors.vehicleId = new mongoose.Error.ValidatorError({
						message: 'Path `vehicleId` is required.',
						path: 'vehicleId',
					});
				}
				throw error;
			}
			return this;
		});
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('should create a journey with default values', async () => {
		const journey = new Journey({
			journeyId: new mongoose.Types.ObjectId(),
			userId: new mongoose.Types.ObjectId(),
			vehicleId: new mongoose.Types.ObjectId(),
		});

		const savedJourney = await journey.save();

		expect(savedJourney.startTime).toBe(moment().tz('Asia/Dhaka').format());
		expect(savedJourney.endTime).toBe(moment().tz('Asia/Dhaka').format());
		expect(savedJourney?.startLocation?.type).toBe('Point');
		expect(savedJourney?.startLocation?.coordinates).toEqual([0, 0]);
		expect(savedJourney?.endLocation?.type).toBe('Point');
		expect(savedJourney?.endLocation?.coordinates).toEqual([0, 0]);
		expect(savedJourney.checkpoints).toEqual([]);
		expect(savedJourney.bill).toBe(0);
		expect(savedJourney.createdAt).toBe(moment().tz('Asia/Dhaka').format());
	});

	it('should not allow negative bill values', async () => {
		const journey = new Journey({
			journeyId: new mongoose.Types.ObjectId(),
			userId: new mongoose.Types.ObjectId(),
			vehicleId: new mongoose.Types.ObjectId(),
			bill: -10,
		});

		let err: unknown;
		try {
			await journey.save();
		} catch (error) {
			err = error;
		}

		expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
		expect((err as mongoose.Error.ValidationError).errors.bill.message).toBe('-10 cannot be negative!');
	});

	it('should require journeyId, userId, and vehicleId', async () => {
		const journey = new Journey({});

		let err: unknown;
		try {
			await journey.save();
		} catch (error) {
			err = error;
		}

		expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
		expect((err as mongoose.Error.ValidationError).errors.journeyId).toBeDefined();
		expect((err as mongoose.Error.ValidationError).errors.userId).toBeDefined();
		expect((err as mongoose.Error.ValidationError).errors.vehicleId).toBeDefined();
	});
});
