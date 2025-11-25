import { News, NewsDto } from '../models/news.model';

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
		typeof (news as News).content === 'string'
	);
};

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
