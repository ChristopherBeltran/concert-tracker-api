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

describe('Updating a venue', () => {

    let venue;

    beforeEach((done) => {
        mongoose.connection.collections.venues.drop(() => {
            //this function runs after the drop is completed
            venue = new Venue({
                name: 'Red Rocks Amphitheatre',
                location: 'Denver, CO'
            });
            venue.save()
                .then(() => done());

        })
    })

    function assertHelper(statement, done) {
        statement
            .then(() => Venue.find({}))
            .then((foundVenue) => {
                assert(foundVenue.length === 1);
                assert(foundVenue[0].name === 'The Fillmore');
                done();
            });
    }

    it('sets and saves venue using an instance', (done) => {
        venue.set('name', 'The Fillmore'); //not updated in mongodb yet
        assertHelper(venue.save(), done);
    });

    it('update venue using instance', (done) => {
        //useful to update multiple fields of the object
        assertHelper(venue.updateOne({
            name: 'The Fillmore',
        }), done);
    });

    it('update all matching venues using model', (done) => {
        assertHelper(Venue.updateMany({
            name: 'Red Rocks Amphitheatre'
        }, {
            name: 'The Fillmore'
        }), done);
    });

    it('update one venue using model', (done) => {
        assertHelper(Venue.findOneAndUpdate({
            name: 'Red Rocks Amphitheatre'
        }, {
            name: 'The Fillmore'
        }), done);
    });

    it('update one venue with id using model', (done) => {
        assertHelper(Venue.findByIdAndUpdate(venue._id, {
            name: 'The Fillmore'
        }), done);
    });
});