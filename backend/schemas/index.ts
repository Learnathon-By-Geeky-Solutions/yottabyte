import mongoose from 'mongoose';
import moment from 'moment-timezone';


const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		maxlength: 255,
		validate: {
			validator: function(v: string): boolean {
				return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
			},
			message: (props: { value: any; }) : string => `${props.value} is not a valid email!`
		}
	},
	picture: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function(v: string): boolean {
				return /^(\+8801|01)[3-9][0-9]{8}$/.test(v);
			},
			message: (props: { value: any; }): string => `${props.value} is not a valid phone number!`
		}
	},
	balance: {
		type: Number,
		required: true,
		default: 0,
	},
	password: {
		type: String,
		required: true,
	},
	groups: {
		type: Array,
		default: [],
	},
	createdAt: {
		type: String,
		default:(): string => moment().tz('Asia/Dhaka').format(),
	},
	updatedAt: {
		type: String,
		default:(): string => moment().tz('Asia/Dhaka').format(),
	}
});

const User = mongoose.model('User', userSchema);

const schemas = {
	User,
}

export default schemas;
