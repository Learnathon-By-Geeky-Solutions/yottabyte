import bc from 'bcrypt';
import fs from 'fs';
import path from 'path';

const hashPassword = async (plaintextPassword: string): Promise<string> => {
	return await bc.hash(plaintextPassword, 10);
};

const comparePassword = async (
	plaintextPassword: string,
	hash: string
): Promise<boolean> => {
	return await bc.compare(plaintextPassword, hash);
};

const randomText = (): string => {
	return Math.random().toString(36).substring(2, 15);
};

const readConfigFile = (field?: string) : any => {
	const filePath = path.join(__dirname, '../config.json');
	if (!fs.existsSync(filePath)) {
		throw new Error('Config file not found');
	}
	const data = fs.readFileSync(filePath, 'utf8');
	try {
		const config = JSON.parse(data);
		if (field) {
			return config[field];
		}
		return JSON.parse(data);
	} catch (e) {
		console.error('Error parsing JSON file:', e);
		throw e;
	}
}

const utils = {
	hashPassword,
	comparePassword,
	randomText,
	readConfigFile,
};

export default utils;
