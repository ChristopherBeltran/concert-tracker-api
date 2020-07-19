require('dotenv').config()
const mongoose = require('mongoose');
const User = require('../models/user')
const Artist = require('../models/artist')
const Venue = require('../models/venue')
const Concert = require('../models/concert')
const dbPassword = process.env.DB_PASSWORD
const uri = `mongodb+srv://cdbeltran:${dbPassword}@concert-tracker.vvfpq.mongodb.net/concert-tracker?retryWrites=true&w=majority`
//const mongoDB = 'mongodb://127.0.0.1/concert-tracker';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


db.once('open', function () {


    /*     const testUser = new User({
            name: 'Frank Zappa',
            email: 'someemal@google.com',
            password: 'Hellofriends1',
            concerts: []
        }) */

    const testArtist = new Artist({
        name: "Pretty Lights",
        genres: [
            "Electronic",
            "JazzHop",
            "Electro-Soul"
        ]
    })

    const testVenue = new Venue({
        name: "Red Rocks Ampitheater",
        location: "Morrison, CO"
    })

    const testConcert = new Concert({
        date: '08/21/2018',
        user: "5f0244b16a6e0a55cc40ce8e",
        venue: "5f0b67cc2fcd590cdc4e7228",
        artist: "5f0b67cc2fcd590cdc4e7227"
    })


    testConcert.save(function (err, concert) {
        if (err) {
            console.log(err)
        }
        console.log(`${concert._id} saved!`)
    })


})