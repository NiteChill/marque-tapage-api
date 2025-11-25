import { Router, Request, Response } from 'express';
import {
	getFavorites,
	createFavorite,
	updateFavorite,
	deleteFavorite,
	getFavoriteById,
	getFavoritesByCategory,
} from '../services/favorites.service';
import { isFavoriteDto, parseFavoriteBody } from '../utils/favorites.utils';
import { AppError } from '../utils/errors';
import { authToken } from '../middleware/auth.middleware';

export const favoritesController = Router();

favoritesController.get('/', (req: Request, res: Response) => {
	let limit = Number(req.query.limit) || 0;
	let page = Number(req.query.page) || 0;
	if (isNaN(limit)) limit = 0;
	if (isNaN(page)) page = 0;
	const favorites = getFavorites(limit, page);
	res.json(favorites);
});

favoritesController.get('/:id', (req: Request, res: Response) => {
	const id = Number(req.params.id);
	if (isNaN(id) || id <= 0) throw new AppError('Invalid ID', 400);
	const favorite = getFavoriteById(id);
	if (!favorite) throw new AppError('Favorite not found', 404);
	res.json(favorite);
});

favoritesController.get(
	'/categories/:categories',
	(req: Request, res: Response) => {
		if (!req.params.categories) throw new AppError('Invalid categories', 400);
		const categories = req.params.categories
			.split(',')
			.map((cat) => cat.trim())
			.filter((cat) => cat.length > 0);
		if (categories.length === 0)
			throw new AppError('No valid categories provided', 400);
		const favorites = getFavoritesByCategory(categories);
		res.json(favorites);
	}
);

favoritesController.post('/', authToken, (req: Request, res: Response) => {
	const payload = parseFavoriteBody(req.body);
	if (!isFavoriteDto(payload)) throw new AppError('Invalid favorite', 400);
	const favorite = createFavorite(payload);
	if (!favorite) throw new AppError('Favorite not created', 500);
	res.json(favorite);
});

favoritesController.put('/:id', authToken, (req: Request, res: Response) => {
	if (!req.params.id) throw new AppError('Invalid favorite id', 400);
	const id = Number(req.params.id);
	if (isNaN(id) || id <= 0) throw new AppError('Invalid ID', 400);
	const payload = parseFavoriteBody(req.body);
	if (!isFavoriteDto(payload)) throw new AppError('Invalid favorite', 400);
	const favorite = updateFavorite({ ...payload, id });
	if (!favorite) throw new AppError('Favorite not found', 404);
	res.json(favorite);
});

favoritesController.delete('/:id', authToken, (req: Request, res: Response) => {
	if (!req.params.id) throw new AppError('Invalid favorite id', 400);
	const id = Number(req.params.id);
	if (isNaN(id) || id <= 0) throw new AppError('Invalid ID', 400);
	deleteFavorite(id);
	res.json({ message: 'Favorite deleted' });
});
