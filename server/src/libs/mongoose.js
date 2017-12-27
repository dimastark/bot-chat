const config = require('config');
const Mongoose = require('mongoose');

const logger = require('./logger')('db');

Mongoose.Promise = global.Promise;

Mongoose.connect(config.db.uri, {useMongoClient: true});

const db = Mongoose.connection;

db.on('error', error => {
    logger.error(error);
});

db.once('open', () => {
    logger.log('Database connected');
});

module.exports = Mongoose;
