import {
  Seeder
} from 'mongoose-data-seed';
import {
  Concert
} from '../models/concert';

const data = [{

}];

class ConcertsSeeder extends Seeder {

  async shouldRun() {
    return Concert.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Concert.create(data);
  }
}

export default ConcertsSeeder;