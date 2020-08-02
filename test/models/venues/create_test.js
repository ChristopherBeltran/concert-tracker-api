require('dotenv').config()
const assert = require('assert');
const expect = require('chai').expect;
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

beforeEach((done) => {
    mongoose.connection.collections.venues.drop(() => {
        //this function runs after the drop is completed
        done(); //go ahead everything is done now.
    });
});

describe('Creating documents', () => {
    it('creates a venue', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        const venue = new Venue({
            name: 'Red Rocks Amphitheatre',
            location: 'Denver, CO'
        });
        venue.save() //takes some time and returns a promise
            .then(() => {
                assert(!venue.isNew); //if poke is saved to db it is not new
                done();
            });
    });

    it('should be invalid if name is empty', (done) => {
        const venue = new Venue({
            location: 'Denver, CO'
        })

        venue.validate((err) => {
            expect(err.errors.name).to.exist
            done()
        })
    })

    it('should be invalid if location is empty', (done) => {
        const venue = new Venue({
            name: 'The Fillmore'
        })

        venue.validate((err) => {
            expect(err.errors.location).to.exist
            done()
        })
    });
});