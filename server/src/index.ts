import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';

import controller from './controllers';

dotenv.config();

const SERVER_PORT = process.env.PORT;

const app = express();

app.use(cors(/* TODO */));

app.use(express.json());

app.use('/', controller);

app.listen(SERVER_PORT, () =>
  console.log(
    `⚡️ http://localhost:${SERVER_PORT}`
  )
);
