import express, { Response } from 'express';
import { expressjwt, Request as JWTRequest} from 'express-jwt';
import { JWT_TOKEN_ALGORITM, JWT_TOKEN_SECRET } from '../core/constants';
import { IUser, UserRole } from '../core/types';
import { getUsers } from '../db/repositories/userRepository';

const userRouter = express.Router();

userRouter.get('/', expressjwt({ secret: JWT_TOKEN_SECRET, algorithms: [JWT_TOKEN_ALGORITM] }), async (request: JWTRequest, response: Response) => {
  const jwtPayload = request.auth as Partial<IUser>;

  if (jwtPayload?.role !== UserRole.ADMIN) {
    return response.status(403).send({error: 'No access!'});
  }

  response.json(await getUsers());
});


export default userRouter;