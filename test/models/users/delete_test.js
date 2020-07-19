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
mongoose.set('useFindAndModify', false);
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ', error);
    }); //Called hooks which runs before something.

describe('Deleting a user', () => {

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

    it('removes a user using its instance', (done) => {
        user.deleteOne()
            .then(() => User.findOne({
                name: 'Peter Pan'
            }))
            .then((foundUser) => {
                assert(foundUser === null);
                done();
            });
    });

    it('removes multiple users', (done) => {
        User.deleteMany({
                name: 'Peter Pan'
            })
            .then(() => User.findOne({
                name: 'Peter Pan'
            }))
            .then((foundUser) => {
                assert(foundUser === null);
                done();
            });
    });

    it('removes a user', (done) => {
        User.findOneAndDelete({
                name: 'Peter Pan'
            })
            .then(() => User.findOne({
                name: 'Peter Pan'
            }))
            .then((foundUser) => {
                assert(foundUser === null);
                done();
            });
    });

    it('removes a user using id', (done) => {
        User.findByIdAndRemove(user._id)
            // the following code block is repeated again and again
            .then(() => User.findOne({
                name: 'Peter Pan'
            }))
            .then((foundUser) => {
                assert(foundUser === null);
                done();
            });
        // block end
    })
})