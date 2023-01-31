require('dotenv').config();

export const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
export const JWT_TOKEN_ALGORITM = 'HS256';
export const JWT_TOKEN_EXPIRATION = '30m';

export const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
