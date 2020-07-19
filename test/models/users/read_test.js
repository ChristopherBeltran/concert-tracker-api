require('dotenv').config()
const assert = require('assert');
const User = require('../../../models/user');
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

let user;

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        user = new User({
            name: 'Peter Pan',
            email: "neverland@gmail.com",
            password: "flywithme24"
        });
        user.save()
            .then(() => done());
    });
})

describe('Reading user details', () => {
    it("finds user with the name of 'Peter Pan'", (done) => {
        User.findOne({
                name: 'Peter Pan'
            })
            .then((users) => {
                assert(user.name === 'Peter Pan');
                done();
            });
    })
})