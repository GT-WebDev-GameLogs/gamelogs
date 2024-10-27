import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { google } from 'googleapis';
import { getOAuthAPIClient, getOAuthAuthenticator } from './get-auth';

const app: Express = express();
const PORT: string = process.env.PORT || '7776';
const ACCESS_TOKEN_COOKIE_NAME: string = process.env.ACCESS_TOKEN_COOKIE_NAME;

app.use(cors());
app.use(cookieParser());

app.get('/', async (req: Request, res: Response) => {
  let helloMessage;
  try {
    const tokens = JSON.parse(req.cookies[ACCESS_TOKEN_COOKIE_NAME])
    const oauth2 = getOAuthAPIClient(tokens);
    const { data } = await oauth2.userinfo.get();
    helloMessage = `<p>Hello, ${data}`;
  } catch (e) {
    helloMessage = `<p>Hello, error: ${e}`;
  }
  
  res.send(helloMessage);
});

app.get('/login', (req: Request, res: Response) => {
  const oauth2Client = getOAuthAuthenticator();
  const url = oauth2Client.generateAuthUrl({
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
  });

  res.redirect(url);
});

app.get('/callback', async (req: Request, res: Response) => {
  const authCode: string = req.query.code as string; // if this causes issues, remove the string type assertion
  const oauth2Client = getOAuthAuthenticator();
  const { tokens } = await oauth2Client.getToken(authCode);
  console.log(tokens);
  const oauth2 = getOAuthAPIClient(tokens);

  const { data } = await oauth2.userinfo.get();
  console.log(data);
  res.cookie(ACCESS_TOKEN_COOKIE_NAME, JSON.stringify(tokens), { httpOnly: true })
  res.redirect('/')
});

app.get('/test', async (req: Request, res: Response) => {
  let testMessage: string;
  try {
    const tokens = JSON.parse(req.cookies[ACCESS_TOKEN_COOKIE_NAME])
    console.log(req.cookies)
    const oauth2 = getOAuthAPIClient(tokens);
    const { data } = await oauth2.userinfo.get();
    console.log(data);
    testMessage = JSON.stringify(data);
  } catch(e) {
    console.log(e);
    testMessage = e;
  }

  res.send(`<p>Test endpoint ${testMessage}</p>`);
});

app.listen(PORT, () => {
  console.log(`gamelogs server running on port ${PORT}`);
});
