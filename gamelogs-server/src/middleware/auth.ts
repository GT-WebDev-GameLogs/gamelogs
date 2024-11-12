import 'dotenv/config';
import { Request, Response } from 'express';
import { getOAuthAPIClient } from 'src/get-auth';

const ACCESS_TOKEN_COOKIE_NAME = process.env.ACCESS_TOKEN_COOKIE_NAME

export default function validateLoggedIn(req: Request, res: Response, next) {
  try {
    const tokens = JSON.parse(req.cookies[ACCESS_TOKEN_COOKIE_NAME]);
    if (Date.now() >= tokens.expiry_date) {
      console.log('Token expired');
      return res.status(401).send();
    }
    next()
  } catch (e) {
    console.log(e)
    res.status(401).send(e)
  }
}