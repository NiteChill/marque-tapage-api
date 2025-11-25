import db from '../db/database';
import { NewsDto, News } from '../models/news.model';

export const getNews = (): News[] => {
	return db.prepare('SELECT * FROM news').all() as News[];
};

export const getNewsById = (id: number): News | undefined => {
	return db.prepare('SELECT * FROM news WHERE id = ?').get(id) as
		| News
		| undefined;
};

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

export const createNews = (news: NewsDto): News | undefined => {
	return db
		.prepare('INSERT INTO news (title, content) VALUES (?, ?) RETURNING *')
		.get(news.title, news.content) as News | undefined;
};

export const updateNews = (news: News): News | undefined => {
	return db
		.prepare('UPDATE news SET title = ?, content = ? WHERE id = ? RETURNING *')
		.get(news.title, news.content, news.id) as News | undefined;
};

export const deleteNews = (id: number): void => {
	db.prepare('DELETE FROM news WHERE id = ?').run(id);
};
