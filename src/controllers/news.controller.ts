import { Router, Request, Response } from 'express';
import {
	getNews,
	getNewsById,
	createNews,
	updateNews,
	deleteNews,
	getNewsByCategory,
} from '../services/news.service';
import { News } from '../models/news.model';
import { isNews, isNewsDto } from '../utils/news.utils';
import { authToken } from '../middleware/auth.middleware';
import { AppError } from '../utils/errors';

export const newsController = Router();

newsController.get('/', (req: Request, res: Response) => {
	let limit = Number(req.query.limit) || 0;
	let page = Number(req.query.page) || 0;
	if (isNaN(limit)) limit = 0;
	if (isNaN(page)) page = 0;
	const news: News[] = getNews(limit, page);
	for (const el of news)
		if (!isNews(el)) throw new AppError('News not found', 500);
	res.json(news);
});

newsController.get('/:id', (req: Request, res: Response) => {
	if (!req.params.id) throw new AppError('Invalid ID', 400);
	const id = Number(req.params.id);
	if (isNaN(id) || id <= 0) throw new AppError('Invalid ID', 400);
	const news: News | undefined = getNewsById(id);
	if (!news) throw new AppError('News not found', 500);
	if (!isNews(news)) throw new AppError('News not found', 500);
	res.json(news);
});

newsController.get('/categories/:categories', (req: Request, res: Response) => {
	if (!req.params.categories) throw new AppError('Invalid categories', 400);
	const categories = req.params.categories
		.split(',')
		.map((cat) => cat.trim())
		.filter((cat) => cat.length > 0);
	if (categories.length === 0)
		throw new AppError('No valid categories provided', 400);
	const news: News[] = getNewsByCategory(categories);
	if (!news) throw new AppError('News not found', 500);
	for (const el of news)
		if (!isNews(el)) throw new AppError('News not found', 500);
	res.json(news);
});

newsController.post('/', authToken, (req: Request, res: Response) => {
	if (!isNewsDto(req.body)) throw new AppError('Invalid news', 400);
	const news: News | undefined = createNews(req.body);
	if (!news) throw new AppError('News not created', 500);
	if (!isNews(news)) throw new AppError('News not created', 500);
	res.json(news);
});

newsController.put('/:id', authToken, (req: Request, res: Response) => {
	if (!req.params.id) throw new AppError('Invalid ID', 400);
	const id = Number(req.params.id);
	if (isNaN(id) || id <= 0) throw new AppError('Invalid ID', 400);
	if (!isNewsDto(req.body)) throw new AppError('Invalid news', 400);
	const news: News | undefined = updateNews({ id, ...req.body });
	if (!news) throw new AppError('News not updated', 500);
	if (!isNews(news)) throw new AppError('News not updated', 500);
	res.json(news);
});

newsController.delete('/:id', authToken, (req: Request, res: Response) => {
	if (!req.params.id) throw new AppError('Invalid ID', 400);
	const id = Number(req.params.id);
	if (isNaN(id) || id <= 0) throw new AppError('Invalid ID', 400);
	deleteNews(id);
	res.json({ message: 'News deleted' });
});
