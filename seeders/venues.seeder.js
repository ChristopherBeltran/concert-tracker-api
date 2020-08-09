import {
  Seeder
} from 'mongoose-data-seed';
import {
  Venue
} from '../models/venue';

const data = [{

}];

class VenuesSeeder extends Seeder {

  async shouldRun() {
    return Venue.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Venue.create(data);
  }
}

export default VenuesSeeder;