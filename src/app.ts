import express from 'express';
import { authController } from './controllers/auth.controller';
import { newsController } from './controllers/news.controller';
import { favoritesController } from './controllers/favorites.controller';
import { errorHandler } from './middleware/error.middleware';

export const app = express();
app.use(express.json());

app.use('/news', newsController);
app.use('/favorites', favoritesController);
app.use('/auth', authController);

app.use(errorHandler);
