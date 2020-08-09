require('dotenv').config()
const assert = require('assert');
const Venue = require('../../../models/venue');
const mongoose = require('mongoose');
const dbPassword = process.env.DB_PASSWORD
const uri = `mongodb+srv://cdbeltran:${dbPassword}@concert-tracker.vvfpq.mongodb.net/concert-tracker?retryWrites=true&w=majority`
//const mongoDB = 'mongodb://127.0.0.1/concert-tracker';

mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ', error);
    }); //Called hooks which runs before something.

let venue;

beforeEach((done) => {
    mongoose.connection.collections.venues.drop(() => {
        venue = new Venue({
            name: 'Red Rocks Amphitheatre',
            location: 'Denver, CO'
        });
        venue.save()
            .then(() => done());
    });
})

describe('Reading venue details', () => {
    it("finds venue with the name of 'Red Rocks Amphitheatre'", (done) => {
        Venue.findOne({
                name: 'Red Rocks Amphitheatre'
            })
            .then((venue) => {
                assert(venue.name === 'Red Rocks Amphitheatre');
                done();
            });
    })
})