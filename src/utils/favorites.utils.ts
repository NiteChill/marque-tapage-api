import { Favorite, FavoriteDto } from '../models/favorites.model';
import { AppError } from './errors';
import { isRecord } from './utils';

export const isFavorite = (favorite: unknown): favorite is Favorite => {
	return (
		favorite !== null &&
		typeof favorite === 'object' &&
		'id' in favorite &&
		'title' in favorite &&
		'author' in favorite &&
		'cover_image' in favorite &&
		'description' in favorite &&
		'price' in favorite &&
		'note' in favorite &&
		'created_at' in favorite &&
		typeof (favorite as Favorite).id === 'number' &&
		typeof (favorite as Favorite).title === 'string' &&
		typeof (favorite as Favorite).author === 'string' &&
		typeof (favorite as Favorite).cover_image === 'string' &&
		typeof (favorite as Favorite).description === 'string' &&
		typeof (favorite as Favorite).price === 'number' &&
		typeof (favorite as Favorite).note === 'number' &&
		typeof (favorite as Favorite).created_at === 'string'
	);
};

export const isFavoriteDto = (favorite: unknown): favorite is FavoriteDto => {
	return (
		favorite !== null &&
		typeof favorite === 'object' &&
		'title' in favorite &&
		'author' in favorite &&
		'cover_image' in favorite &&
		'description' in favorite &&
		'price' in favorite &&
		'note' in favorite &&
		typeof (favorite as FavoriteDto).title === 'string' &&
		typeof (favorite as FavoriteDto).author === 'string' &&
		typeof (favorite as FavoriteDto).cover_image === 'string' &&
		typeof (favorite as FavoriteDto).description === 'string' &&
		typeof (favorite as FavoriteDto).price === 'number' &&
		typeof (favorite as FavoriteDto).note === 'number'
	);
};

/**
 * Parse the given object to a FavoriteDto
 * @param   {unknown}     body The object to parse
 * @returns {FavoriteDto} The parsed object
 */
export const parseFavoriteBody = (body: unknown): FavoriteDto => {
	if (!isRecord(body)) throw new AppError('Invalid favorite', 400);
	const { title, author, cover_image, description, price, note } = body;
	if (
		typeof title !== 'string' ||
		typeof author !== 'string' ||
		typeof cover_image !== 'string' ||
		typeof description !== 'string' ||
		typeof price !== 'string' ||
		typeof note !== 'string'
	)
		throw new AppError('Invalid favorite', 400);
	const parsedPrice = Number(price);
	const parsedNote = Number(note);
	if (isNaN(parsedPrice))
		throw new AppError('Price must be a valid number', 400);
	if (isNaN(parsedNote)) throw new AppError('Note must be a valid number', 400);
	return {
		title,
		author,
		cover_image,
		description,
		price: parsedPrice,
		note: parsedNote,
	};
};
