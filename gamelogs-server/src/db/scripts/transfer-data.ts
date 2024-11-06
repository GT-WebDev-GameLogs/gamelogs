import 'dotenv/config';
import axios from 'axios';
import pg from 'pg';
import { getGameData } from '../../gameApi';
import { getAccessToken } from 'src/twitchApi';

const { Client } = pg;
const pgConfig: pg.ConnectionConfig = {
  connectionString: process.env.PG_CONNECTION, // postgres://user:password@host:port/database, use \conninfo to find host port info
};

const IGDB_CLIENT_ID = process.env.IGDB_CLIENT_ID || process.env.CLIENT_ID;

interface GameMultiValueData {
  genreId: number | null,
  genreName: string | null,
  gamemodeId: number | null,
  gamemodeName: string | null,
  keywordId: number | null,
  keywordName: string | null,
  themeId: number | null,
  themeName: string | null,
  platformId: number | null,
  platformName: string | null,
  companyId: number | null,
  companyName: string | null,
  developer: boolean | null,
  publisher: boolean | null,
}

function undefinedTo0(any?: any): any {
  return any === undefined ? 0 : any
}

function createGameMultiValueData(): GameMultiValueData {
  return {
    genreId: null,
    genreName: null,
    gamemodeId: null,
    gamemodeName: null,
    keywordId: null,
    keywordName: null,
    themeId: null,
    themeName: null,
    platformId: null,
    platformName: null,
    companyId: null,
    companyName: null,
    developer: null,
    publisher: null,
  }
}

function sqlParseString(str: string) {
  return str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
}

function mapGameMultiValueDataToSQL(data: GameMultiValueData): string {
  // order matters
  return `
    ROW(
      ${data.genreId},
      ${sqlParseString(data.genreName)},
      ${data.gamemodeId},
      ${sqlParseString(data.gamemodeName)},
      ${data.keywordId},
      ${sqlParseString(data.keywordName)},
      ${data.themeId},
      ${sqlParseString(data.themeName)},
      ${data.platformId},
      ${sqlParseString(data.platformName)},
      ${data.companyId},
      ${sqlParseString(data.companyName)},
      ${data.developer},
      ${data.publisher}
    )::game_multivalue_data
  `;
}

async function addToGameTable(igdbOffset: number, limit: number = 500) {
  let accessToken = await getAccessToken();
  const query = `
    fields 
      name,
      summary,
      genres.name,
      game_modes.name,
      keywords.name,
      themes.name,
      platforms.name,
      involved_companies.company.name,
      involved_companies.developer,
      involved_companies.publisher
    ;
    where (category != (1, 3, 5)) & (status != (6, 7)) & themes != (42);
    limit ${limit};
    offset ${igdbOffset};
  `;
  const games = await getGameData(IGDB_CLIENT_ID, accessToken, query);

  console.log(games);

  for (const game of games) {
    const gameId: number = game.id;
    const gameName: string = game.name;
    const rating: number = 0;
    const description: string = game.summary;

    const multiDataSize = Math.max(
      undefinedTo0(game.genres?.length), 
      undefinedTo0(game.game_modes?.length), 
      undefinedTo0(game.keywords?.length), 
      undefinedTo0(game.themes?.length), 
      undefinedTo0(game.platforms?.length), 
      undefinedTo0(game.involved_companies?.length)
    );
    const multiData = Array.from({ length: multiDataSize }, createGameMultiValueData);

    for (let i = 0; i < game.genres?.length; i++) {
      multiData[i].genreId = game.genres[i].id;
      multiData[i].genreName = game.genres[i].name;
    }

    for (let i = 0; i < game.game_modes?.length; i++) {
      multiData[i].gamemodeId = game.game_modes[i].id;
      multiData[i].gamemodeName = game.game_modes[i].name;
    }

    for (let i = 0; i < game.keywords?.length; i++) {
      multiData[i].keywordId = game.keywords[i].id;
      multiData[i].keywordName = game.keywords[i].name;
    }

    for (let i = 0; i < game.themes?.length; i++) {
      multiData[i].themeId = game.themes[i].id;
      multiData[i].themeName = game.themes[i].name;
    }

    for (let i = 0; i < game.platforms?.length; i++) {
      multiData[i].platformId = game.platforms[i].id;
      multiData[i].platformName = game.platforms[i].name;
    }

    for (let i = 0; i < game.involved_companies?.length; i++) {
      multiData[i].companyId = game.involved_companies[i].id;
      multiData[i].companyName = game.involved_companies[i].company.name;
      multiData[i].publisher = game.involved_companies[i].publisher;
      multiData[i].developer = game.involved_companies[i].developer;
    }

    // console.log(multiData);

    let query = `
      CALL add_igdb_game_data(
        ${gameId},
        ${sqlParseString(gameName)},
        ${rating},
        ${sqlParseString(description)},
        ${
          multiDataSize != 0 ? `ARRAY[${multiData.map(mapGameMultiValueDataToSQL)}]` : 'NULL'
        })
    `;
    // console.log(query);

    const pgClient: pg.Client = new Client(pgConfig);
    pgClient.on('notice', (notice) => {
      console.warn('pgClient notice:', notice);
    });
    await pgClient.connect();
    
    try {
        const res: pg.QueryResult = await pgClient.query(query);
        // console.log(res);
    } catch (err: any) {
        console.log(err);
    } finally {
        pgClient.end();
    }
  }
}

async function fillDatabase() {

}

addToGameTable(0, 500);