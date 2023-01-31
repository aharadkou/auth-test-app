import jwt from 'jsonwebtoken';

import { IUser } from '../core/types';
import { JWT_TOKEN_SECRET, JWT_TOKEN_ALGORITM, JWT_TOKEN_EXPIRATION } from '../core/constants';

export const generateAuthToken = (user: IUser) => {
  const payload = { id: user.id, username: user.username, role: user.role };
  const token = jwt.sign(payload, JWT_TOKEN_SECRET, { algorithm: JWT_TOKEN_ALGORITM, expiresIn: JWT_TOKEN_EXPIRATION });

  return token;
};