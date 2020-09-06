const mongoose = require('mongoose');

const config = require ('./server-config')

mongoose.Promise = global.Promise;
mongoose.connect(config.database_uri, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 1000
}, function(err){
    err ? console.error('there was a problem connecting to the database, might be unavaliable, details: ', err.message) : console.log('connected to the database')
});

//const that will hold the database connection
const db = mongoose.connection;

// db.on('open', () => {
//     console.log('successfully connected to the database');
// })

// db.on('error', () => {
//     console.log('error connecting to the database');
// })

// db.on('disconnected', () => {
//     console.log('database disconnected')
// })

module.exports = db;