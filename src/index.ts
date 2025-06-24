import cors from 'cors';
import express, { Application } from 'express';
import dotenv from 'dotenv';

import { favoritesController } from './controllers/favorites.controller';
import { newsController } from './controllers/news.controller';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/favorites', favoritesController);
app.use('/news', newsController);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});