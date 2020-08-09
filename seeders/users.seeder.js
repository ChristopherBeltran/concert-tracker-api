import {
  Seeder
} from 'mongoose-data-seed';
import {
  User
} from '../models/user';

const data = [{
    name: 'Leonardo',
    email: 'leo@gmail.com',
    password: 'turtletime1',
  },
  {
    name: 'Donnatello',
    email: 'donnie@gmail.com',
    password: 'turtletime1'
  },
  {
    name: 'Raphael',
    email: 'raph@gmail.com',
    password: 'turtlestuff1'
  }
];

class UsersSeeder extends Seeder {

  async shouldRun() {
    return User.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

export default UsersSeeder;