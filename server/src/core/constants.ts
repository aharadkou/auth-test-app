require('dotenv').config();

export const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
export const JWT_TOKEN_ALGORITM = 'HS256';
export const JWT_TOKEN_EXPIRATION = '12h';

export const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
export const INVITE_SECRET = process.env.INVITE_SECRET;


export const NO_ACCESS_ERROR = 'No access!';

export const UNIQUE_CONSTRAINT_ERROR_CODE = 11000;
