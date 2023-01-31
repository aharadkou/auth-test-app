import { Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import serverless from 'serverless-http';

import { initDb } from './db/initDb';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';

const app = express();
const port = 4001;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

initDb();

app.get('/api/healthcheck', (_: Request, response: Response) => {
  response.send('Api is alive!');
});

app.use('/api/users', userRouter);

app.use('/api/auth', authRouter);

app.listen(port, () => console.log(`Running on port ${port}`));

module.exports.handler = serverless(app);