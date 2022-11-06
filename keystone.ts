// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import dotenv from 'dotenv';
import { config } from '@keystone-6/core';

import { lists } from './schema';
import { withAuth, session } from './auth';

dotenv.config();

const {
  DB_URL: dbUrl,
  DB_PROVIDER: dbProvider,
  CORS_ORIGIN: corsOriginJson,
} = process.env;

const corsOrigin = JSON.parse(corsOriginJson);

if (!Array.isArray(corsOrigin)) {
  throw new Error('CORS_ORIGIN must be an array of URL strings');
}

export default withAuth(
  config({
    db: {
      provider: dbProvider,
      url: dbUrl,
    },
    server: {
      cors: {
        origin: corsOrigin,
      },
    },
    lists,
    session,
  })
);
