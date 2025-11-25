import db from '../db/database';
import { FavoriteDto, Favorite } from '../models/favorites.model';
import { AppError } from '../utils/errors';

/**
 * Get all favorites
 * @param   {number}      limit Limit of favorites
 * @param   {number}      page  Page of favorites
 * @returns {Favorite[]}  Array of favorite objects
 */
export const getFavorites = (limit?: number, page?: number): Favorite[] => {
	if (!limit || limit <= 0 || limit > 100) limit = 20;
	if (!page || page <= 0) page = 1;
	return db
		.prepare('SELECT * FROM favorites ORDER BY id DESC LIMIT ? OFFSET ?')
		.all(limit, (page - 1) * limit) as Favorite[];
};

/**
 * Get favorite by id
 * @param   {number}               id Favorite id
 * @returns {Favorite | undefined} Favorite object
 */
export const getFavoriteById = (id: number): Favorite | undefined => {
	return db.prepare('SELECT * FROM favorites WHERE id = ?').get(id) as
		| Favorite
		| undefined;
};

/**
 * Get favorites by category
 * @param   {string[]}   categories Category labels
 * @returns {Favorite[]} Array of favorite objects
 */
export const getFavoritesByCategory = (categories: string[]): Favorite[] => {
	const uniqueCategories = [...new Set(categories)];
	if (uniqueCategories.length === 0) return [];
	const placeholders = uniqueCategories.map(() => '?').join(', ');
	return db
		.prepare(
			`
        SELECT f.*
        FROM favorites f
        INNER JOIN favorites_favorites_categories ff ON f.id = ff.favorite_id
        INNER JOIN favorites_categories fc ON ff.favorite_category_id = fc.id
        WHERE fc.label IN (${placeholders})
        GROUP BY f.id
        HAVING COUNT(DISTINCT fc.label) = ?
        ORDER BY f.id DESC
        LIMIT 20
      `
		)
		.all(...categories, categories.length) as Favorite[];
};

/**
 * Create favorite
 * @param   {FavoriteDto}          favorite Favorite object
 * @returns {Favorite | undefined} Favorite object
 */
export const createFavorite = (favorite: FavoriteDto): Favorite | undefined => {
	return db
		.prepare(
			'INSERT INTO favorites (title, author, cover_image, description, price, note) VALUES (?, ?, ?, ?, ?, ?) RETURNING *'
		)
		.get(
			favorite.title,
			favorite.author,
			favorite.cover_image,
			favorite.description,
			favorite.price,
			favorite.note
		) as Favorite;
};

/**
 * Update favorite
 * @param   {FavoriteDto}          favorite Favorite object
 * @returns {Favorite | undefined} Favorite object
 */
export const updateFavorite = (favorite: FavoriteDto): Favorite | undefined => {
	return db
		.prepare(
			'UPDATE favorites SET title = ?, author = ?, cover_image = ?, description = ?, price = ?, note = ? WHERE id = ? RETURNING *'
		)
		.get(
			favorite.title,
			favorite.author,
			favorite.cover_image,
			favorite.description,
			favorite.price,
			favorite.note,
			favorite.id
		) as Favorite;
};

/**
 * Delete favorite
 * @param   {number} id Favorite id
 * @returns {void} throws error if favorite not found
 */
export const deleteFavorite = (id: number): void => {
	const result = db.prepare('DELETE FROM favorites WHERE id = ?').run(id);
	if (result.changes === 0) throw new AppError('Favorite not found', 404);
};
