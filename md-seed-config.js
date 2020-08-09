import mongoose from 'mongoose';
import Users from './seeders/users.seeder'
import Artists from './seeders/artists.seeder'
import Venues from './seeders/venues.seeder'
import Concerts from './seeders/concerts.seeder'
const mongoose = require('mongoose');
const dbPassword = process.env.DB_PASSWORD
const uri = `mongodb+srv://cdbeltran:${dbPassword}@concert-tracker.vvfpq.mongodb.net/concert-tracker?retryWrites=true&w=majority`
//const mongoDB = 'mongodb://127.0.0.1/concert-tracker';

mongoose.Promise = global.Promise;

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
  Artists,
  Venues,
  Concerts,
  Users
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', (error) => {
    console.warn('Error : ', error);
  }); //Called hooks which runs before something.

/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();