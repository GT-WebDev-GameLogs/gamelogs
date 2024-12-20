import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import { getAccessToken } from './twitchApi.ts';
import cookieParser from 'cookie-parser';
import { google } from 'googleapis';
import { getGameData, fetchGameWithPlatformAndGenres } from './gameApi.ts';

import { getOAuthAPIClient, getOAuthAuthenticator } from './get-auth';
import validateLoggedIn from './middleware/auth.ts';

const app: Express = express();
const PORT: string = process.env.PORT || '7776';
const ACCESS_TOKEN_COOKIE_NAME: string = process.env.ACCESS_TOKEN_COOKIE_NAME;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use('/auth-api/', validateLoggedIn)

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

  // add user to backend db

  // save to cookie
  res.cookie(ACCESS_TOKEN_COOKIE_NAME, JSON.stringify(tokens), { httpOnly: true, sameSite: 'lax', domain: 'localhost' })
  res.redirect('http://localhost:5173/')
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

app.post('/auth-api/post-review/:gameId', async (req: Request, res: Response) => {
  return res.send("hello");
});

app.post('/auth-api/get-user-info', async (req: Request, res: Response) => {
  const tokens = JSON.parse(req.cookies[ACCESS_TOKEN_COOKIE_NAME])
  const oauth2 = getOAuthAPIClient(tokens);
  const { data } = await oauth2.userinfo.get();
  res.json(data);
});

app.get('/get-twitch-token', async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    if (!token) {
      return res.status(500).json({ error: 'Failed to get access token' });
    }
    res.json({ accessToken: token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/games', async (req: Request, res: Response) => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return res.status(500).json({ error: 'Failed to get access token' });
    }

    const query = req.query.query as string || 'search "Halo"; fields id, name, platforms.name, genres.name, rating, first_release_date; limit 10;';

    const clientId = process.env.IGDB_CLIENT_ID || process.env.CLIENT_ID;
    const gameData = await getGameData(clientId, accessToken, query);

    if (!gameData) {
      console.log('Game data is empty or invalid.');
      return res.status(500).json({ error: 'Failed to get game data' });
    }

    console.log('Raw game data from IGDB:', gameData);  // Log the raw game data

    // const enrichedGameData = await fetchGameWithPlatformAndGenres(clientId, accessToken, gameData);

    res.json(gameData);
  } catch (error) {
    console.error('Error during game data fetching:', error);  // Log the error message
    res.status(500).json({ error: 'Error fetching game details' });
  }
});


app.get('/games-with-details', async (req: Request, res: Response) => {
  try {
    const gameName = req.query.game as string;
    if (!gameName) {
      return res.status(400).json({ error: 'Please provide a game name as a query parameter' });
    }
    const query = `search "${gameName}"; fields id, name, platforms.name, genres.name, rating, first_release_date; limit 10;`;

    const accessToken = await getAccessToken();
    if (!accessToken) {
      console.error("Access token is missing or invalid.");
      return res.status(500).json({ error: 'Failed to get access token' });
    }

    const clientId = process.env.IGDB_CLIENT_ID || process.env.CLIENT_ID;
    console.log(`Searching for game: ${gameName}`);

    // Fetch game data from IGDB
    const gameData = await getGameData(clientId, accessToken, query);
    console.log("Raw game data from IGDB:", gameData); // Log raw game data

    // Check if the gameData is empty or null
    if (!gameData || gameData.length === 0) {
      console.warn(`No game data found for query: ${gameName}`);
      return res.status(404).json({ error: 'No games found for the given name' });
    }

    // Enrich game data with platform and genre names
    // const enrichedGameData = await fetchGameWithPlatformAndGenres(clientId, accessToken, gameData);
    const enrichedGameData = gameData;
    console.log("Enriched game data:", enrichedGameData); // Log enriched game data

    res.json(enrichedGameData);
  } catch (error) {
    console.error('Error fetching game details:', error);
    res.status(500).json({ error: 'Error fetching game details' });
  }
});



app.listen(PORT, () => {
  console.log(`gamelogs server running on port ${PORT}`);
});