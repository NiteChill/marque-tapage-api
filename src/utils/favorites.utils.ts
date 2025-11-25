import { Favorite, FavoriteDto } from '../models/favorites.model';

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
