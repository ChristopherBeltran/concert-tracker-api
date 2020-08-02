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
mongoose.set('useFindAndModify', false);
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ', error);
    }); //Called hooks which runs before something.

describe('Deleting a venue', () => {

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

    it('removes a venue using its instance', (done) => {
        venue.deleteOne()
            .then(() => Venue.findOne({
                name: 'Red Rocks Amphitheatre'
            }))
            .then((foundVenue) => {
                assert(foundVenue === null);
                done();
            });
    });

    it('removes multiple venues', (done) => {
        Venue.deleteMany({
                name: 'Red Rocks Amphitheatre'
            })
            .then(() => Venue.findOne({
                name: 'Red Rocks Amphitheatre'
            }))
            .then((foundVenue) => {
                assert(foundVenue === null);
                done();
            });
    });

    it('removes a venue', (done) => {
        Venue.findOneAndDelete({
                name: 'Red Rocks Amphitheatre'
            })
            .then(() => Venue.findOne({
                name: 'Red Rocks Amphitheatre'
            }))
            .then((foundVenue) => {
                assert(foundVenue === null);
                done();
            });
    });

    it('removes a venue using id', (done) => {
        Venue.findByIdAndRemove(venue._id)
            // the following code block is repeated again and again
            .then(() => Venue.findOne({
                name: 'Red Rocks Amphitheatre'
            }))
            .then((foundVenue) => {
                assert(foundVenue === null);
                done();
            });
        // block end
    })
})