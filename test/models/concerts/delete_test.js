require('dotenv').config()
const assert = require('assert');
const expect = require('chai').expect;
const Artist = require('../../../models/artist');
const Concert = require('../../../models/concert')
const Venue = require('../../../models/venue')
const User = require('../../../models/user')
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

let artist;
let user;
let venue;

beforeEach((done) => {
    mongoose.connection.collections.artists.drop(() => {
        artist = new Artist({
            name: 'Led Zeppelin',
            genres: [
                "Classic Rock",
                "Progressive Rock"
            ]
        });
        artist.save()
            .then(() => done());
    });

    mongoose.connection.collections.users.drop(() => {
        user = new User({
            name: 'Peter Pan',
            email: "neverland@gmail.com",
            password: "flywithme24"
        });
        user.save()
            .then(() => done());
    });

    mongoose.connection.collections.venues.drop(() => {
        venue = new Venue({
            name: 'Red Rocks Amphitheatre',
            location: 'Denver, CO'
        });
        venue.save()
            .then(() => done());
    });
})

describe('Deleting a concert', () => {

    it('removes a concert using its instance', (done) => {
        concert.deleteOne()
            .then(() => Concert.findOne({
                name: 'Red Rocks Amphitheatre'
            }))
            .then((foundVenue) => {
                assert(foundVenue === null);
                done();
            });
    });

    it('removes multiple concerts', (done) => {
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
        Venue.findByIdAndRemove(concert._id)
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