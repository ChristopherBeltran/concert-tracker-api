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
mongoose.set('useFindAndModify', false);
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ', error);
    }); //Called hooks which runs before something.

describe('Deleting a artist', () => {

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

    it('removes a artist using its instance', (done) => {
        artist.deleteOne()
            .then(() => Artist.findOne({
                name: 'Led Zeppelin'
            }))
            .then((foundArtist) => {
                assert(foundArtist === null);
                done();
            });
    });

    it('removes multiple artists', (done) => {
        Artist.deleteMany({
                name: 'Led Zeppelin'
            })
            .then(() => Artist.findOne({
                name: 'Led Zeppelin'
            }))
            .then((foundArtist) => {
                assert(foundArtist === null);
                done();
            });
    });

    it('removes a artist', (done) => {
        Artist.findOneAndDelete({
                name: 'Led Zeppelin'
            })
            .then(() => Artist.findOne({
                name: 'Led Zeppelin'
            }))
            .then((foundArtist) => {
                assert(foundArtist === null);
                done();
            });
    });

    it('removes a artist using id', (done) => {
        Artist.findByIdAndRemove(artist._id)
            // the following code block is repeated again and again
            .then(() => Artist.findOne({
                name: 'Led Zeppelin'
            }))
            .then((foundArtist) => {
                assert(foundArtist === null);
                done();
            });
        // block end
    })
})