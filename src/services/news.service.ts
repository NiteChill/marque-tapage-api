import { sanitizeError, UserError } from '../modules/errors.model';
import { News } from '../modules/news.model';
import { DB } from './db.service';
import { LoggerService } from './logger.service';

export class newsService {
  // Get all news //
  public static getAll(categories: string[]): News[] {
    // Dynamic WHERE clause //
    let conditions = '';
    if (categories.length > 0) {
      const placeholders = categories.map(() => '?').join(', ');
      conditions = `WHERE categories.label IN (${placeholders})`;
    }
    const req = `
      SELECT
        articles.*,
        GROUP_CONCAT(categories.label) AS categories
      FROM news
      INNER JOIN articles
        ON news.id = articles.id
      INNER JOIN article_categories
        ON articles.id = article_categories.article_id
      INNER JOIN categories
        ON article_categories.category_id = categories.id
      ${conditions}
      GROUP BY
        news.id;
    `;

    // Execute query //
    try {
      const data: any[] = DB.prepare(req).all(categories);
      const transformedData: News[] = data.map((news) => ({
        ...news,
        categories: news.categories ? news.categories.split(',') : [],
      }));
      return transformedData;
    } catch (err) {
      LoggerService.error(err);
      throw new UserError(sanitizeError(err));
    }
  }
}
