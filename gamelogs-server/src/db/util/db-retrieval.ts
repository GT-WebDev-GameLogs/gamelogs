import pg from 'pg';
import 'dotenv/config';
const { Client } = pg;

interface GameInfo {
    gameId: number,
    gameName: string,
}

const pgConfig: pg.ConnectionConfig = {
  connectionString: process.env.PG_CONNECTION, // postgres://user:password@host:port/database, use \conninfo to find host port info
};

export async function retrieveGame(gameId: Number) {
    const client = new Client(pgConfig);
    client.connect();
    const res = await client.query(`SELECT * FROM get_game_info(${gameId})`);
    const multivalue = await client.query(`SELECT * FROM get_game_multivalue_info(${gameId})`)
    const reviews = await client.query(`SELECT * FROM get_game_reviews(${gameId}, 0, 10)`)
    // console.log(res.rows)
    // console.log(multivalue.rows)
    // console.log(reviews.rows)
    return {
      base: res.rows, 
      multivalue: multivalue.rows,
      reviews: reviews.rows
    };
}

export async function retrieveUser(userId: Number, offset: Number = 0, limit: Number = 10) {
  const client = new Client(pgConfig);
  client.connect();
  const userInfo = await client.query(`SELECT * FROM get_user_info(${userId})`);
  const reviewInfo = await client.query(`SELECT * FROM get_user_reviews(${userId}, ${offset}, ${limit})`)
  // console.log(userInfo.rows);
  // console.log(reviewInfo.rows);
  return {
    base: userInfo.rows,
    reviews: reviewInfo.rows,
  }
}
