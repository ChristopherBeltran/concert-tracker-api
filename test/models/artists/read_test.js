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

let artist;

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
})

describe('Reading artist details', () => {
    it("finds artist with the name of 'Led Zeppelin'", (done) => {
        Artist.findOne({
                name: 'Led Zeppelin'
            })
            .then((artist) => {
                assert(artist.name === 'Led Zeppelin');
                done();
            });
    })
})