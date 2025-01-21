import colors from 'colors';
import mongoose from 'mongoose';

const init = async (mongoUri: string) => {
	try {
		if (mongoUri) {
			await mongoose.connect(mongoUri);
			console.log(colors.green('Connected to MongoDB'));
		} else {
			throw new Error('No URI provided');
		}
	} catch (error) {
		console.error(colors.red('Failed to connect to MongoDB'), error);
		throw new Error(`Failed to initialize MongoDB: ${error}`);
	}
};

const close = async () => {
	try {
		await mongoose.connection.close();
	} catch (error) {
		console.error(colors.red('Failed to close MongoDB connection:'), error);
		throw error;
	}
};

const mongo = {
	init,
	close,
};

export default mongo;
