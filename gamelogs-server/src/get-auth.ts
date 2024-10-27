import 'dotenv/config';
import { Credentials } from 'google-auth-library';
import { google } from 'googleapis';

// this is what you should use to get user information
// token / session lasts until server restarts
export function getOAuthAPIClient(credentials: Credentials) {
    const oauth2Client = getOAuthAuthenticator();
    oauth2Client.setCredentials(credentials)
    const oauth = google.oauth2({
        version: 'v2',
        auth: oauth2Client,
    });

    return oauth;
}

export function getOAuthAuthenticator() {
    const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI,
    );

    return oauth2Client
}
