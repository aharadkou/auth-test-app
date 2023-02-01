import express, { Response, Request } from 'express';
import { expressjwt, Request as JWTRequest} from 'express-jwt';

import { JWT_TOKEN_ALGORITM, JWT_TOKEN_SECRET, UNIQUE_CONSTRAINT_ERROR_CODE } from '../core/constants';
import { IUser, UserRole } from '../core/types';
import { verifyRecaptcha } from '../middlewares/verifyRecaptcha';
import { generateAuthToken } from '../services/authorizationService';
import { addUser, getUser, getUserById } from '../services/userService';

const authRouter = express.Router();

authRouter.get('/user-info', expressjwt({ secret: JWT_TOKEN_SECRET, algorithms: [JWT_TOKEN_ALGORITM] }), async (request: JWTRequest, response: Response) => {
  const jwtPayload = request.auth as Partial<IUser>;

  response.json(await getUserById(jwtPayload.id));
});

authRouter.post('/login', async (request: Request, response: Response) => {
  const { username, password } = request.body;

  const user = await getUser(username, password);

  if (!user) {
    return response.status(401).send({error: 'Invalid username or password!'})
  }

  const token = generateAuthToken(user);
  
  response.json({ token });
});

authRouter.post('/register', verifyRecaptcha, async (request: Request, response: Response) => {
  const { username, password } = request.body;

  try {
    const user = await addUser({username, password, role: UserRole.USER});

    const token = generateAuthToken(user);
    
    response.json({ token });
  } catch (err) {
    if (err?.code === UNIQUE_CONSTRAINT_ERROR_CODE) {
      return response.status(400).send({ error: 'User with such name already exist!' });
    }

    return response.status(500).send({error: err.message});
  }
});

export default authRouter;