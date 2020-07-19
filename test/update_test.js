require('dotenv').config()
const assert = require('assert');
const User = require('../models/user');
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

describe('Updating a user', () => {

    let user;

    beforeEach((done) => {
        mongoose.connection.collections.users.drop(() => {
            //this function runs after the drop is completed
            user = new User({
                name: 'Peter Pan',
                email: "neverland@gmail.com",
                password: "flywithme24"
            });
            user.save()
                .then(() => done());

        })
    })

    function assertHelper(statement, done) {
        statement
            .then(() => User.find({}))
            .then((foundUser) => {
                assert(foundUser.length === 1);
                assert(foundUser[0].name === 'Petey Pan');
                done();
            });
    }

    it('sets and saves user using an instance', (done) => {
        user.set('name', 'Petey Pan'); //not updated in mongodb yet
        assertHelper(user.save(), done);
    });

    it('update user using instance', (done) => {
        //useful to update multiple fields of the object
        assertHelper(user.updateOne({
            name: 'Petey Pan'
        }), done);
    });

    it('update all matching users using model', (done) => {
        assertHelper(User.updateMany({
            name: 'Peter Pan'
        }, {
            name: 'Petey Pan'
        }), done);
    });

    it('update one user using model', (done) => {
        assertHelper(User.findOneAndUpdate({
            name: 'Peter Pan'
        }, {
            name: 'Petey Pan'
        }), done);
    });

    it('update one user with id using model', (done) => {
        assertHelper(User.findByIdAndUpdate(user._id, {
            name: 'Petey Pan'
        }), done);
    });
});