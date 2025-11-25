import { News, NewsDto } from '../models/news.model';

/**
 * Check if the given object is a News
 * @param   {unknown} news The object to check
 * @returns {boolean} true if the object is a News, false otherwise
 */
export const isNews = (news: unknown): news is News => {
	return (
		news !== null &&
		typeof news === 'object' &&
		'id' in news &&
		'title' in news &&
		'content' in news &&
		'created_at' in news &&
		typeof (news as News).id === 'number' &&
		typeof (news as News).title === 'string' &&
		typeof (news as News).content === 'string' &&
		typeof (news as News).created_at === 'string'
	);
};

/**
 * Check if the given object is a NewsDto
 * @param   {unknown} news The object to check
 * @returns {boolean} true if the object is a NewsDto, false otherwise
 */
export const isNewsDto = (news: any): news is NewsDto => {
	return (
		news !== null &&
		typeof news === 'object' &&
		'title' in news &&
		'content' in news &&
		typeof (news as NewsDto).title === 'string' &&
		typeof (news as NewsDto).content === 'string'
	);
};
