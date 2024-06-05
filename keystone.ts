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
      surazalNetFiles: {
        kind: 's3',
        type: 'file',
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        endpoint,
      },
      surazalNetImages: {
        kind: 's3',
        type: 'image',
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        endpoint,
        transformName: (path) => {
          // Regular expression to match the filename and extension
          const regex = /^(.*)\.([^.]+)$/;

          // Execute the regex on the filename
          const match = path.match(regex);

          // If there is no match, return the whole filename and an empty string as extension
          if (!match) {
            return `${path}`;
          }

          // The match result will contain the full match at index 0, the filename at index 1, and the extension at index 2
          const basename = match[1];
          const extension = match[2];

          return `${basename}`;
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
