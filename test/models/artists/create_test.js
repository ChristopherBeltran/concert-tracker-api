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

beforeEach((done) => {
    mongoose.connection.collections.artists.drop(() => {
        //this function runs after the drop is completed
        done(); //go ahead everything is done now.
    });
});

describe('Creating documents', () => {
    it('creates an artist', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        const artist = new Artist({
            name: 'Led Zeppelin',
            genres: [
                "Classic Rock",
                "Progressive Rock"
            ]
        });
        artist.save() //takes some time and returns a promise
            .then(() => {
                assert(!artist.isNew); //if poke is saved to db it is not new
                done();
            });
    });
});