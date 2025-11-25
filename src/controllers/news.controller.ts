import { Router, Request, Response } from 'express';
import {
	getNews,
	getNewsById,
	createNews,
	updateNews,
	deleteNews,
} from '../services/news.service';
import { News } from '../models/news.model';
import { isNewsDto } from '../utils/news.utils';
import { authToken } from '../middleware/auth.middleware';

export const newsController = Router();

newsController.get('/', (req: Request, res: Response) => {
	const news: News[] = getNews();
	res.json(news);
});

newsController.get('/:id', (req: Request, res: Response) => {
	if (!req.params.id) return res.status(400).json({ error: 'Invalid ID' });
	const id = Number(req.params.id);
	const news: News | undefined = getNewsById(id);
	res.json(news);
});

newsController.post('/', authToken, (req: Request, res: Response) => {
	if (!isNewsDto(req.body))
		return res.status(400).json({ error: 'Invalid news' });
	const news: News | undefined = createNews(req.body);
	res.json(news);
});

newsController.put('/:id', authToken, (req: Request, res: Response) => {
	if (!req.params.id) return res.status(400).json({ error: 'Invalid ID' });
	const id = Number(req.params.id);
	if (!isNewsDto(req.body))
		return res.status(400).json({ error: 'Invalid news' });
	const news: News | undefined = updateNews({ id, ...req.body });
	res.json(news);
});

newsController.delete('/:id', authToken, (req: Request, res: Response) => {
	if (!req.params.id) return res.status(400).json({ error: 'Invalid ID' });
	const id = Number(req.params.id);
	deleteNews(id);
	res.json({ message: 'News deleted' });
});
