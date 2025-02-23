import mongoose, { Schema } from 'mongoose';
import moment from 'moment-timezone';

const transactionSchema = new mongoose.Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
		default: 0,
		validate: {
			validator: function(v: number): boolean {
				return v <= 0;
			},
			message: (props: { value: string; }): string => `${props.value} cannot be negative!`
		}
	},
	message: {
		type: String,
		default: '',
	},
	journeyId: {
		type: Schema.Types.ObjectId,
		required: false,
	},
	createdAt: {
		type: String,
		default: (): string => moment().tz('Asia/Dhaka').format(),
	},
	transactionType: {
		type: String,
		enum: ['credit', 'debit'],
		required: true,
	}
});

const Transaction = mongoose.model('Transaction', transactionSchema);

const schemas = {
	Transaction,
}

export default schemas;
