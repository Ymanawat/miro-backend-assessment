import * as conf from 'config';
require('dotenv').config();

export const domainsConfig = conf.get('domains');
console.log(domainsConfig);
export const jwtConfig = conf.get('jwt');

export const MongoConnectionUrl =
  process.env.MONGO_CONNECTION_URL ||
  'mongodb://127.0.0.1:27017/notes-backend?authSource=admin&retryWrites=true';

console.log(MongoConnectionUrl);
