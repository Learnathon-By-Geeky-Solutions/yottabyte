import bc from 'bcrypt';

const utils:any = module.exports;

utils.hashPassword = async (plaintextPassword: string): Promise<string> => {
	return await bc.hash(plaintextPassword, 10);
};

utils.comparePassword = async (
	plaintextPassword: string,
	hash: string
): Promise<boolean> => {
	return await bc.compare(plaintextPassword, hash);
};

utils.randomText = (): string => {
	return Math.random().toString(36).substr(2, 15);
};

utils.readConfigFile = (field?: string) :void => {
	const fs = require('fs');
	const path = require('path');

	const filePath = path.join(__dirname, '../config.json');
	if (!fs.existsSync(filePath)) {
		throw new Error('Config file not found');
	}
	const data = fs.readFileSync(filePath);
	try {
		const config = JSON.parse(data);
		if (field) {
			return config[field];
		}
		return JSON.parse(data);
	} catch (e) {
		console.log('Error parsing JSON file:', e);
		throw e;
	}
}

export default utils;
