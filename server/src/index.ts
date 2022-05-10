import express from 'express';
import cors from 'cors';
import { config } from './config';
import controllers from './controllers';
import { auth } from './middlewares/auth';

const app = express();

app.use(cors(/* TODO */));
app.use(express.json());

app.use('/api', auth, controllers);

app.listen(config.server.port, () =>
  console.log(`⚡️ http://localhost:${config.server.port}`)
);
