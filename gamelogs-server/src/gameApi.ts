import axios from 'axios';

// Function to get game data
export async function getGameData(clientId: string, accessToken: string, query: string = 'fields name, cover.url; limit 10;') {
  try {
    const response = await axios.post(
      'https://api.igdb.com/v4/games',
      query,
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching game data from IGDB:', error);
    return null;
  }
}


// Function to get platforms by their IDs
export async function getPlatformsByIds(clientId: string, accessToken: string, platformIds: number[]) {
  try {
    const response = await axios.post(
      'https://api.igdb.com/v4/platforms',
      `where id = (${platformIds.join(', ')}); fields id, name;`,
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching platform data:', error);
    return null;
  }
}

// Function to get genres by their IDs
export async function getGenresByIds(clientId: string, accessToken: string, genreIds: number[]) {
  try {
    const response = await axios.post(
      'https://api.igdb.com/v4/genres',
      `where id = (${genreIds.join(', ')}); fields id, name;`,
      {
        headers: {
          'Client-ID': clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching genre data:', error);
    return null;
  }
}

export async function fetchGameWithPlatformAndGenres(clientId: string, accessToken: string, gameData: any[]) {
    const allPlatformIds = new Set<number>();
    const allGenreIds = new Set<number>();

    gameData.forEach(game => {
      // Check if platforms exist before looping through them
      if (game.platforms && Array.isArray(game.platforms)) {
        game.platforms.forEach((platformId: number) => allPlatformIds.add(platformId));
      }

      // Check if genres exist before looping through them
      if (game.genres && Array.isArray(game.genres)) {
        game.genres.forEach((genreId: number) => allGenreIds.add(genreId));
      }
    });

    const platforms = await getPlatformsByIds(clientId, accessToken, Array.from(allPlatformIds));
    const genres = await getGenresByIds(clientId, accessToken, Array.from(allGenreIds));

    const platformMap = platforms.reduce((acc: any, platform: any) => {
      acc[platform.id] = platform.name;
      return acc;
    }, {});

    const genreMap = genres.reduce((acc: any, genre: any) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});

    return gameData.map(game => ({
      ...game,
      platformNames: game.platforms ? game.platforms.map((platformId: number) => platformMap[platformId]) : [],
      genreNames: game.genres ? game.genres.map((genreId: number) => genreMap[genreId]) : []
    }));
  }
