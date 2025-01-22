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
	},
	picture: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
		unique: true,
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
