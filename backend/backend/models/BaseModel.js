const mongoose = require('mongoose');
const config = require('../config.js');

const connectionInstance = mongoose.createConnection(config.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

connectionInstance.on('error', (err) => {
    if (err) {
        throw err;
    }
});

connectionInstance.once('open', () => {
    console.log(`MongoDb connected successfully`);
});

module.exports = connectionInstance;

const logDebug = true;
mongoose.set('debug', logDebug);