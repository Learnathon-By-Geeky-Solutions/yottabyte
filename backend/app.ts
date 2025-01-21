// Copyright (C) 2024 Fardin Kamal <fardinkamal62@proton.me>

import express from 'express';
import createError from 'http-errors';
import colors from 'colors';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'express-async-errors';

import indexRoute from './routes/index'
import userRoute from './routes/user'
import mongo from './db';
import utils from './utils';
import errorHandler from './middlewares/error-handler';

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

// // Error handler
// app.use(
// 	(
// 		err: { message: any; status: any },
// 		req: { app: { get: (arg0: string) => string } },
// 		res: {
//             locals: { message: any; error: any };
//             status: (arg0: any) => void;
//             render: (arg0: string) => void;
//         }
// 	) => {
// 		// Set locals, only providing error in development
// 		res.locals.message = err.message;
// 		res.locals.error = req.app.get('env') === 'development' ? err : {};
//
// 		// Render the error page
// 		res.status(err.status || 500);
// 		res.render('error'); // Ensure you have a view named 'error'
// 	}
// );

// Start the server
const configData = utils.readConfigFile();
const PORT = configData.port;

app.listen(PORT, () => {
	console.log(colors.yellow('Starting BDPay Backend...'));
	console.log(colors.yellow('Connecting to database...'));

	try {
		mongo.init(configData.env === 'development' ? configData.mongo.dev_uri : configData.mongo.uri)
			.then(() => {
			})
			.then(() => {
				console.log(colors.green(`Server started on port ${PORT}`));
			})
			.catch((error: any) => {
				throw error;
			});
	} catch (err) {
		console.log(colors.red('Error occurred, server can\'t start\n'), err);
		throw err;
	}
});
