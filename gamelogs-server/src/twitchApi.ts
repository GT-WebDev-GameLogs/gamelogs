import axios from 'axios';
import 'dotenv/config';

export async function getAccessToken(): Promise<string | null> {

    const clientId = process.env.IGDB_CLIENT_ID;
    const clientSecret = process.env.CLIENT_ID;

    console.log('Using Client ID:', clientId);
    console.log('Using Client Secret:', clientSecret);

    try {
      const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials',
        },
      });
      console.log('Access token response:', response.data);
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error.response?.data || error.message);
      return null;
    }
  }
