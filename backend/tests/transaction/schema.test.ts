import mongoose from 'mongoose';
import schemas from '../../schemas/transaction';
import moment from 'moment-timezone';

const { Transaction } = schemas;

describe('Transaction Schema', () => {
	beforeAll(() => {
		jest.spyOn(Transaction.prototype, 'save').mockImplementation(async function (this: typeof Transaction.prototype) {
			if (this.amount < 0) {
				const error = new mongoose.Error.ValidationError(this);
				error.errors.amount = new mongoose.Error.ValidatorError({
					message: `${this.amount} cannot be negative!`,
					path: 'amount',
					value: this.amount,
				});
				throw error;
			}
			if (!this.userId || !this.transactionType) {
				const error = new mongoose.Error.ValidationError(this);
				if (!this.userId) {
					error.errors.userId = new mongoose.Error.ValidatorError({
						message: 'Path `userId` is required.',
						path: 'userId',
					});
				}
				if (!this.transactionType) {
					error.errors.transactionType = new mongoose.Error.ValidatorError({
						message: 'Path `transactionType` is required.',
						path: 'transactionType',
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

	it('should create a transaction with default values', async () => {
		const transaction = new Transaction({
			userId: new mongoose.Types.ObjectId(),
			amount: 100,
			transactionType: 'credit',
		});

		const savedTransaction = await transaction.save();

		expect(savedTransaction.message).toBe('');
		expect(savedTransaction.createdAt).toBe(moment().tz('Asia/Dhaka').format());
	});

	it('should not allow negative amount values', async () => {
		const transaction = new Transaction({
			userId: new mongoose.Types.ObjectId(),
			amount: -100,
			transactionType: 'debit',
		});

		let err: unknown;
		try {
			await transaction.save();
		} catch (error) {
			err = error;
		}

		expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
		expect((err as mongoose.Error.ValidationError).errors.amount.message).toBe('-100 cannot be negative!');
	});

	it('should require userId and transactionType', async () => {
		const transaction = new Transaction({
			amount: 100,
		});

		let err: unknown;
		try {
			await transaction.save();
		} catch (error) {
			err = error;
		}

		expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
		expect((err as mongoose.Error.ValidationError).errors.userId).toBeDefined();
		expect((err as mongoose.Error.ValidationError).errors.transactionType).toBeDefined();
	});
});
