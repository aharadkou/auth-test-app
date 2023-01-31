import express, { Response, Request, NextFunction } from 'express';
import { expressjwt, Request as JWTRequest} from 'express-jwt';
import fetch from 'node-fetch';

import { JWT_TOKEN_ALGORITM, JWT_TOKEN_SECRET, RECAPTCHA_SECRET } from '../core/constants';
import { IUser, UserRole } from '../core/types';
import { addUser, getUser, getUserById } from '../db/repositories/userRepository';
import { generateAuthToken } from '../services/authorizationService';

const UNIQUE_CONSTRAINT_ERROR_CODE = 11000;

const authRouter = express.Router();

authRouter.get('/user-info', expressjwt({ secret: JWT_TOKEN_SECRET, algorithms: [JWT_TOKEN_ALGORITM] })), async (request: JWTRequest, response: Response) => {
  const jwtPayload = request.auth as Partial<IUser>;

  response.json(await getUserById(jwtPayload.id));
};

authRouter.post('/login', async (request: Request, response: Response) => {
  const { username, password } = request.body;

  const user = await getUser(username, password);

  if (!user) {
    return response.status(401).send({error: 'Invalid username or password!'})
  }

  const token = generateAuthToken(user);
  
  response.json({ token });
});

const verifyRecaptcha = async (request: Request, response: Response, next: NextFunction) => {
  const { recaptchaToken } = request.body;

  const recaptchaVerificationResponse = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`
    }
  );
 
  const recaptchaVerificationResponseJson = await recaptchaVerificationResponse.json() as { success: boolean };

  if (!recaptchaVerificationResponseJson.success) {
    return response.status(400).send({error: 'Captcha is not passed, please try again'})
  }

  next();
};

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