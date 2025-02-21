import mongoose, { Schema } from 'mongoose';
import moment from 'moment-timezone';

const journeySchema = new mongoose.Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	vehicleId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	startTime: {
		type: String,
		required: true,
		default: (): string => moment().tz('Asia/Dhaka').format(),
	},
	endTime: {
		type: String,
		default: '-1',
	},
	startLocation: {
		type: {
			type: String,
			enum: ['Point'],
			default: 'Point',
		},
		coordinates: {
			type: [Number],
			required: true,
			default: [0, 0],
		}
	},
	endLocation: {
		type: {
			type: String,
			enum: ['Point'],
			default: 'Point',
		},
		coordinates: {
			type: [Number],
			required: true,
			default: [0, 0],
		}
	},
	checkpoints: {
		type: [Number],
		default: [],
	},
	bill: {
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
	createdAt: {
		type: String,
		default: (): string => moment().tz('Asia/Dhaka').format(),
	},
	updatedAt: {
		type: String,
		default: (): string => moment().tz('Asia/Dhaka').format(),
	},
});

const Journey = mongoose.model('Journey', journeySchema);

const schemas = {
	Journey,
}

export default schemas;
