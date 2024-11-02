import axios from 'axios';
import 'dotenv/config';

export async function getAccessToken(): Promise<string | null> {
    const clientId = process.env.IGDB_CLIENT_ID || process.env.CLIENT_ID;
    const clientSecret = process.env.IGDB_CLIENT_SECRET || process.env.CLIENT_SECRET;

    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        return null;
    }
}
