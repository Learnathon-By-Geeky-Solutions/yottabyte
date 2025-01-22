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
		validate: {
			validator: function(v: string) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
			},
			message: props => `${props.value} is not a valid email!`
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
			validator: function(v: string) {
				return /^(\+8801|01)[3-9][0-9]{8}$/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
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
		default:() => moment().tz('Asia/Dhaka').format(),
	},
	updatedAt: {
		type: String,
		default:() => moment().tz('Asia/Dhaka').format(),
	}
});

const User = mongoose.model('User', userSchema);

const schemas = {
	User,
}

export default schemas;
