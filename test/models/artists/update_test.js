require('dotenv').config()
const assert = require('assert');
const Artist = require('../../../models/artist');
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

describe('Updating a artist', () => {

    let artist;

    beforeEach((done) => {
        mongoose.connection.collections.artists.drop(() => {
            //this function runs after the drop is completed
            artist = new Artist({
                name: 'Led Zeppelin',
                genres: [
                    "Classic Rock",
                    "Progressive Rock"
                ]
            });
            artist.save()
                .then(() => done());

        })
    })

    function assertHelper(statement, done) {
        statement
            .then(() => Artist.find({}))
            .then((foundArtist) => {
                assert(foundArtist.length === 1);
                assert(foundArtist[0].name === 'Aerosmith');
                done();
            });
    }

    it('sets and saves artist using an instance', (done) => {
        artist.set('name', 'Aerosmith'); //not updated in mongodb yet
        assertHelper(artist.save(), done);
    });

    it('update artist using instance', (done) => {
        //useful to update multiple fields of the object
        assertHelper(artist.updateOne({
            name: 'Aerosmith',
        }), done);
    });

    it('update all matching artists using model', (done) => {
        assertHelper(Artist.updateMany({
            name: 'Led Zeppelin'
        }, {
            name: 'Aerosmith'
        }), done);
    });

    it('update one artist using model', (done) => {
        assertHelper(Artist.findOneAndUpdate({
            name: 'Led Zeppelin'
        }, {
            name: 'Aerosmith'
        }), done);
    });

    it('update one artist with id using model', (done) => {
        assertHelper(Artist.findByIdAndUpdate(artist._id, {
            name: 'Aerosmith'
        }), done);
    });
});