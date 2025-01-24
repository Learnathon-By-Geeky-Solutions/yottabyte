// Copyright (C) 2024 Fardin Kamal <fardinkamal62@proton.me>

import express from 'express';
import createError from 'http-errors';
import colors from 'colors';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'express-async-errors';
import * as process from 'node:process';

import indexRoute from './routes/index'
import userRoute from './routes/user'
import mongo from './db';
import utils from './utils';
import errorHandler from './middlewares/error-handler';
import { ConfigFile } from './types';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Router
app.use('/api/v1/user', userRoute.router);
app.use('/', indexRoute.router);

// Handle 404 errors
app.use((_req: any, _res: any, next: (_arg0: any) => void) => {
	next(createError(404, 'Not found'));
});

// Error handler middleware
app.use(errorHandler);

// Start the server
const configData: ConfigFile = <ConfigFile>utils.readConfigFile();
const PORT = configData.port;

app.listen(PORT, () => {
	console.log(colors.yellow('Starting BDPay Backend...'));
	console.log(colors.yellow('Connecting to database...'));

	if (configData.env == null || configData.mongo == null || configData.mongo.uri == null || configData.mongo.dev_uri == null) {
		console.error(colors.red('Environment not found'));
		process.exit(1);
	}

	mongo.init(configData.env === 'development' ? configData.mongo.dev_uri : configData.mongo.uri)
		.then(() => {
			console.log(colors.green(`Server started on port ${PORT}`));
		})
		.catch((error: any) => {
			console.log(colors.red('Error occurred, server can\'t start\n'), error);
			process.exit(1);
		});
});
