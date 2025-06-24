import { Request, Response, Router } from 'express';

export const favoritesController = Router();

favoritesController.get('/', (req: Request, res: Response) => {
  res.status(200).json('Hello world - Favs');
});
