import pg from 'pg';
const { Client } = pg;

interface GameInfo {
    gameId: number,
    gameName: string,
}

export async function retrieveGame(gameId: Number): GameInfo {
    const client = new Client();
    client.connect();
    const res = await client.query('CALL <procedure>');
    return null
}