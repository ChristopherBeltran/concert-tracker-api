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

describe('Creating documents', () => {
    it('creates a concert', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        const concert = new Concert({
            date: '08/21/2018',
            user: user._id,
            artist: artist._id,
            venue: venue._id
        });
        concert.save() //takes some time and returns a promise
            .then(() => {
                assert(!concert.isNew); //if poke is saved to db it is not new
                done();
            });
    });

    it('should be invalid if date is empty', (done) => {
        const concert = new Concert({
            user: user._id,
            artist: artist._id,
            venue: venue._id
        })

        concert.validate((err) => {
            expect(err.errors.date).to.exist
            done()
        })
    })
});