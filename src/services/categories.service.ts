import { Category, CategoryType } from '../modules/categories.model';
import { sanitizeError, UserError } from '../modules/errors.model';
import { DB } from './db.service';
import { LoggerService } from './logger.service';

export class categoriesService {
  // Get all categories //
  public static getAll(category_type: CategoryType): Category[] {
    // Execute query //
    try {
      const data: Category[] = DB.prepare(
        'SELECT * FROM categories WHERE category_type = ?'
      ).all(category_type);
      return data;
    } catch (err) {
      LoggerService.error(err);
      throw new UserError(sanitizeError(err));
    }
  }
}
