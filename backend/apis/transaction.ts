import schemas from '../schemas/transaction';
import transactionValidator from '../validators/transaction';


const transactionSchema = schemas.Transaction;

const trigger = async (type: String, amount: Number, message: String, journeyId?: string): Promise<object> => {
	try {
		transactionValidator.transactionSchema.validate({
			amount: amount,
			message: message,
			transactionType: type,
			journeyId: journeyId,
		});

		const data = {
			amount: amount,
			message: message,
			transactionType: type,
			journeyId: journeyId,
		};

		return await transactionSchema.create(data);
	} catch (e) {
		console.error('Failed to create transaction', e);
		throw e;
	}

};

const transactionApi = {
	trigger,
};

export default transactionApi;
