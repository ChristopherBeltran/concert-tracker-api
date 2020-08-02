require('dotenv').config()
const assert = require('assert');
const expect = require('chai').expect;
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

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        //this function runs after the drop is completed
        done(); //go ahead everything is done now.
    });
});

describe('Creating user documents', () => {
    it('creates a user', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        const user = new User({
            name: 'Peter Pan',
            email: "neverland@gmail.com",
            password: "flywithme24"
        });
        user.save() //takes some time and returns a promise
            .then(() => {
                assert(!user.isNew); //if poke is saved to db it is not new
                done();
            });
    });

    it('should be invalid if name is empty', (done) => {
        const user = new User()

        user.validate((err) => {
            expect(err.errors.name).to.exist
            done()
        })
    })

    it('should be invalid if email is empty', (done) => {
        const user = new User()

        user.validate((err) => {
            expect(err.errors.email).to.exist
            done()
        })
    })

    it('should be invalid if password is empty', (done) => {
        const user = new User()

        user.validate((err) => {
            expect(err.errors.password).to.exist
            done()
        })
    })


    it('should be invalid if email is not valid email', (done) => {
        const user = new User({
            name: 'Peter Pan',
            email: "neverlandatgmail.com",
            password: "flywithme24"
        });

        user.validate((err) => {
            expect(err.errors.email).to.exist
            done()
        })
    })

    it('should be invalid if password is less than 7 characters', (done) => {
        const user = new User({
            name: 'Peter Pan',
            email: "neverlandatgmail.com",
            password: "flyfly"
        });

        user.validate((err) => {
            expect(err.errors.password).to.exist
            done()
        })
    })

});