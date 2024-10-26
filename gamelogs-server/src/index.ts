import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import { getAccessToken } from './twitchApi.ts';
import { google } from 'googleapis';
import { getGameData, fetchGameWithPlatformAndGenres } from './gameapi.ts';


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

    const searchQuery = req.query.search as string || 'Halo';

    const clientId = process.env.CLIENT_ID;
    const gameData = await getGameData(clientId, accessToken, searchQuery);

    if (!gameData) {
      console.log('Game data is empty or invalid.');
      return res.status(500).json({ error: 'Failed to get game data' });
    }

    console.log('Raw game data from IGDB:', gameData);  // Log the raw game data

    const enrichedGameData = await fetchGameWithPlatformAndGenres(clientId, accessToken, gameData);

    res.json(enrichedGameData);
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

    const accessToken = await getAccessToken();
    if (!accessToken) {
      console.error("Access token is missing or invalid.");
      return res.status(500).json({ error: 'Failed to get access token' });
    }

    const clientId = process.env.CLIENT_ID;
    console.log(`Searching for game: ${gameName}`);

    // Fetch game data from IGDB
    const gameData = await getGameData(clientId, accessToken, gameName);
    console.log("Raw game data from IGDB:", gameData); // Log raw game data

    // Check if the gameData is empty or null
    if (!gameData || gameData.length === 0) {
      console.warn(`No game data found for query: ${gameName}`);
      return res.status(404).json({ error: 'No games found for the given name' });
    }

    // Enrich game data with platform and genre names
    const enrichedGameData = await fetchGameWithPlatformAndGenres(clientId, accessToken, gameData);
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