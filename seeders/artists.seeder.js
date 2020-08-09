import {
  Seeder
} from 'mongoose-data-seed';
import {
  Artist
} from '../models/artist';

const data = [{

}];

class ArtistsSeeder extends Seeder {

  async shouldRun() {
    return Artist.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Artist.create(data);
  }
}

export default ArtistsSeeder;