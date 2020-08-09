import {
  Seeder
} from 'mongoose-data-seed';
import {
  Venue
} from '../models/venue';

const data = [{
    name: 'Red Rocks Amphitheatre',
    location: 'Morrison, CO'
  },
  {
    name: 'Hollywood Bowl',
    location: 'Hollywood, CA'
  },
  {
    name: 'The Fillmore',
    location: 'San Francisco, CA'
  }
];

class VenuesSeeder extends Seeder {

  async shouldRun() {
    return Venue.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Venue.create(data);
  }
}

export default VenuesSeeder;