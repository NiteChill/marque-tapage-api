import express from 'express';
import { authController } from './controllers/auth.controller';
import { newsController } from './controllers/news.controller';
import { favoritesController } from './controllers/favorites.controller';
import { errorHandler } from './middleware/error.middleware';
import path from 'path';

export const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/news', newsController);
app.use('/favorites', favoritesController);
app.use('/auth', authController);

app.use(errorHandler);
