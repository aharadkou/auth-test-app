import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';
import { RECAPTCHA_SECRET } from '../core/constants';

const RECAPTCHA_VERIFICATION_URL = 'https://www.google.com/recaptcha/api/siteverify';

export const verifyRecaptcha = async (request: Request, response: Response, next: NextFunction) => {
  const { recaptchaToken } = request.body;

  const recaptchaVerificationResponse = await fetch(
    RECAPTCHA_VERIFICATION_URL,
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