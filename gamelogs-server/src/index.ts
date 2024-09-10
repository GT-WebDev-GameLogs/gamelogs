import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send("<p>Hello<p>");
});

app.listen("7776", () => {
  console.log("gamelogs server running on port 7776");
});