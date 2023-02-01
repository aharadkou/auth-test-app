import express, { Response } from 'express';
import { expressjwt, Request as JWTRequest} from 'express-jwt';

import { INVITE_SECRET, JWT_TOKEN_ALGORITM, JWT_TOKEN_SECRET, NO_ACCESS_ERROR } from '../core/constants';
import { IUser, UserRole } from '../core/types';
import { addUser, getUsers } from '../services/userService';

const userRouter = express.Router();

userRouter.get('/', expressjwt({ secret: JWT_TOKEN_SECRET, algorithms: [JWT_TOKEN_ALGORITM] }), async (request: JWTRequest, response: Response) => {
  const jwtPayload = request.auth as Partial<IUser>;

  if (jwtPayload?.role !== UserRole.ADMIN) {
    return response.status(403).send({error: NO_ACCESS_ERROR});
  }

  const users = await getUsers();

  response.json(users);
});

userRouter.post('/', async (request: JWTRequest, response: Response) => {
  const { secret, username, role, password } = request.body;

  if (secret !== INVITE_SECRET) {
    return response.status(403).send({error: NO_ACCESS_ERROR});
  }

  await addUser({username, role, password});

  response.sendStatus(200);
});


export default userRouter;