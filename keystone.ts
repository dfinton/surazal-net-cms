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
  S3_BUCKET_NAME: bucketName,
  S3_REGION: region,
  S3_ACCESS_KEY_ID: accessKeyId,
  S3_SECRET_ACCESS_KEY: secretAccessKey,
  S3_ENDPOINT: endpoint,
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
    storage: {
      surazalNetImages: {
        kind: 's3',
        type: 'image',
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        proxied: {
          baseUrl: '/fractal',
        },
        endpoint,
        signed: {
          expiry: 5000
        },
      },
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
