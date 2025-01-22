import bc from 'bcrypt';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const hashPassword = async (plaintextPassword: string): Promise<string> => {
	try{
		return await bc.hash(plaintextPassword, 10);
	} catch (e) {
		console.error('Error hashing password:', e);
		throw e;
	}
};

const comparePassword = async (
	plaintextPassword: string,
	hash: string
): Promise<boolean> => {
	try{
		return await bc.compare(plaintextPassword, hash);
	} catch (e) {
		console.error('Error comparing password:', e);
		throw e;
	}
};

const randomText = (): string => {
	return crypto.randomBytes(16).toString('hex');
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
