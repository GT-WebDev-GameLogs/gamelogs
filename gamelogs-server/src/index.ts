import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import { google } from 'googleapis';

const app: Express = express();
const PORT: String = process.env.PORT || '7776';
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI,
);

// this is what you should use to get user information
// token / session lasts until server restarts
const oauth2 = google.oauth2({
version: 'v2',
auth: oauth2Client,
});

app.use(cors());

app.get('/', async (req: Request, res: Response) => {
  let helloMessage;
  try {
    const { data } = await oauth2.userinfo.get();
    helloMessage = `<p>Hello, ${data}`;
  } catch (e) {
    helloMessage = `<p>Hello, error: ${e}`;
  }
  
  res.send(helloMessage);
});

app.get('/login', (req: Request, res: Response) => {
  const url = oauth2Client.generateAuthUrl({
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
  });

  res.redirect(url);
});

app.get('/callback', async (req: Request, res: Response) => {
  const authCode: string = req.query.code as string; // if this causes issues, remove the string type assertion
  const { tokens } = await oauth2Client.getToken(authCode);
  console.log(tokens);
  oauth2Client.setCredentials(tokens);

  const { data } = await oauth2.userinfo.get();
  console.log(data);

  res.redirect('/')
});

app.get('/test', async (req: Request, res: Response) => {
  let testMessage: string;
  try {
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
