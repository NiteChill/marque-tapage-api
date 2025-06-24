import { Request, Response, Router } from 'express';

export const newsController = Router();

newsController.get('/', (req: Request, res: Response) => {
  res.status(200).json('Hello world - News');
});
