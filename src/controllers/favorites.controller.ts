import { Request, Response, Router } from 'express';
import { LoggerService } from '../services/logger.service';
import { categoriesService } from '../services/categories.service';
import { CategoryDTO } from '../modules/categories.model';
import { sanitizeError } from '../modules/errors.model';
import { FavoriteDTO } from '../modules/favorites.model';
import { favoritesService } from '../services/favorites.service';

export const favoritesController = Router();

// Get all favorites //
favoritesController.get('/', (req: Request, res: Response) => {
  // Log //
  LoggerService.info('[GET] /favorites/');

  // Variables //
  const categoriesParam = req.query.categories as string;
  let categoryLabels: string[] = [],
    categories: CategoryDTO[] | undefined;

  // Get all categories + Error 400 | invalid filter //
  try {
    categories = categoriesService.getAll('favorites');
  } catch (err) {
    LoggerService.error(err);
    res.status(500).send(sanitizeError(err));
    return;
  }

  if (categoriesParam) {
    categoryLabels = categoriesParam.split(',').map((label) => label.trim());
    const allValid = categoryLabels.every((categoryLabel) =>
      categories.some((category) => categoryLabel === category.label)
    );
    if (!allValid) {
      LoggerService.error('Invalid filter');
      res.status(400).send(sanitizeError('Invalid filter'));
      return;
    }
  }

  // Execute request //
  try {
    const favorites: FavoriteDTO[] | undefined =
      favoritesService.getAll(categoryLabels);
      res.status(200).json(favorites);
  } catch (err) {
    LoggerService.error(err);
    res.status(500).send(sanitizeError(err));
  }
});
