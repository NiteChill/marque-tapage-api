import { sanitizeError, UserError } from '../modules/errors.model';
import { Favorite } from '../modules/favorites.model';
import { DB } from './db.service';
import { LoggerService } from './logger.service';

export class favoritesService {
  // Get all favorites //
  public static getAll(categories: string[]): Favorite[] {
    // Dynamic WHERE clause //
    let conditions = '';
    if (categories.length > 0) {
      const placeholders = categories.map(() => '?').join(', ');
      conditions = `WHERE categories.label IN (${placeholders})`;
    }
    const req = `
      SELECT
        favorites.price,
        favorites.rating,
        articles.*,
        GROUP_CONCAT(categories.label) AS categories
      FROM favorites
      INNER JOIN articles
        ON favorites.id = articles.id
      INNER JOIN article_categories
        ON articles.id = article_categories.article_id
      INNER JOIN categories
        ON article_categories.category_id = categories.id
      ${conditions}
      GROUP BY
        favorites.id;
    `;

    // Execute query //
    try {
      const data: any[] = DB.prepare(req).all(categories);
      const transformedData: Favorite[] = data.map((fav) => ({
        ...fav,
        categories: fav.categories ? fav.categories.split(',') : [],
      }));
      return transformedData;
    } catch (err) {
      LoggerService.error(err);
      throw new UserError(sanitizeError(err));
    }
  }
}
