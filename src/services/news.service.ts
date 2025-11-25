import db from '../db/database';
import { NewsDto, News } from '../models/news.model';
import { AppError } from '../utils/errors';

/**
 * Get all news
 * @param   {number} limit Limit of news
 * @param   {number} page  Page of news
 * @returns {News[]} Array of news
 */
export const getNews = (limit?: number, page?: number): News[] => {
	if (!limit || limit <= 0 || limit > 100) limit = 20;
	if (!page || page <= 0) page = 1;
	return db
		.prepare('SELECT * FROM news ORDER BY id DESC LIMIT ? OFFSET ?')
		.all(limit, (page - 1) * limit) as News[];
};

/**
 * Get news by id
 * @param   {number}           id News id
 * @returns {News | undefined} News object
 */
export const getNewsById = (id: number): News | undefined => {
	return db.prepare('SELECT * FROM news WHERE id = ?').get(id) as
		| News
		| undefined;
};

/**
 * Get news by category
 * @param   {string[]} categories News categories
 * @returns {News[]}   Array of news
 */
export const getNewsByCategory = (categories: string[]): News[] => {
	const uniqueCategories = [...new Set(categories)];
	if (uniqueCategories.length === 0) return [];
	const placeholders = uniqueCategories.map(() => '?').join(', ');
	return db
		.prepare(
			`
        SELECT n.*
        FROM news n
        INNER JOIN news_news_categories nn ON n.id = nn.news_id
        INNER JOIN news_categories nc ON nn.news_category_id = nc.id
        WHERE nc.label IN (${placeholders})
        GROUP BY n.id
        HAVING COUNT(DISTINCT nc.label) = ?
        ORDER BY n.id DESC
        LIMIT 20
      `
		)
		.all(...uniqueCategories, uniqueCategories.length) as News[];
};

/**
 * Create news
 * @param   {NewsDto}          news News object
 * @returns {News | undefined} News object
 */
export const createNews = (news: NewsDto): News | undefined => {
	return db
		.prepare('INSERT INTO news (title, content, cover_image) VALUES (?, ?, ?) RETURNING *')
		.get(news.title, news.content, news.cover_image) as News | undefined;
};

/**
 * Update news
 * @param   {NewsDto}          news NewsDto object
 * @returns {News | undefined} News object
 */
export const updateNews = (news: NewsDto): News | undefined => {
	return db
		.prepare('UPDATE news SET title = ?, content = ?, cover_image = ? WHERE id = ? RETURNING *')
		.get(news.title, news.content, news.cover_image, news.id) as News | undefined;
};

/**
 * Delete news
 * @param   {number} id News id
 * @returns {void} throws error if news not found
 */
export const deleteNews = (id: number): void => {
  const result = db.prepare('DELETE FROM news WHERE id = ?').run(id);
  if (result.changes === 0) throw new AppError('News not found', 404);
};
