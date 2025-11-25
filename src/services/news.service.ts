import db from '../db/database';
import { NewsDto, News } from '../models/news.model';

/**
 * Get all news
 * @returns {News[]} Array of news
 */
export const getNews = (): News[] => {
	return db.prepare('SELECT * FROM news').all() as News[];
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
 * @param   {string} category News category
 * @returns {News[]} Array of news
 */
export const getNewsByCategory = (category: string): News[] => {
	return db
		.prepare(
			`
      SELECT n.* FROM news n
      INNER JOIN news_news_categories nn ON n.id = nn.news_id
      INNER JOIN news_categories nc ON nn.news_category_id = nc.id
      WHERE nc.label = ?
      `
		)
		.all(category) as News[];
};

/**
 * Create news
 * @param   {NewsDto}          news News object
 * @returns {News | undefined} News object
 */
export const createNews = (news: NewsDto): News | undefined => {
	return db
		.prepare('INSERT INTO news (title, content) VALUES (?, ?) RETURNING *')
		.get(news.title, news.content) as News | undefined;
};

/**
 * Update news
 * @param   {News}             news News object
 * @returns {News | undefined} News object
*/
export const updateNews = (news: News): News | undefined => {
	return db
		.prepare('UPDATE news SET title = ?, content = ? WHERE id = ? RETURNING *')
		.get(news.title, news.content, news.id) as News | undefined;
};

/**
 * Delete news
 * @param   {number} id News id
 * @returns {void}
 */
export const deleteNews = (id: number): void => {
	db.prepare('DELETE FROM news WHERE id = ?').run(id);
};
