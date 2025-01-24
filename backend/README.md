<div align="center"><h1>BDPay backend</h1></div>

---

## Description

This is the backend of the BDPay. It is a REST API that provides the necessary endpoints for the mobile app to work. It is built using Node.js and Express.js.

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies. Make sure you have Node.js installed.
3. Copy `config-sample.json` to `config.json` and fill in the necessary values.
    
   - `secret`: The secret key used to sign the JWT tokens.
   - `mongo.uri`: The URI of the MongoDB database. Make sure to include the database name.
   - `mongo.dev_uri`: The URI of the MongoDB database for development. Make sure to include the database name.
   - `port`: The port the server will run on.
   - `env`: Development or production.

4. Run `ts-node app.ts` to start the server or `nodemon app.ts` to start the server with hot reloading.

## Technologies

- Language: `TypeScript` (^5.6.3)
- Framework: `Express.js` (^4.21.2)
- Database: `MongoDB` (^6.12.0)
- ORM: `Mongoose` (^8.9.5)

## License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
