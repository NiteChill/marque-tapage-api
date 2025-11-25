export interface News {
	id: number;
	title: string;
	content: string;
	cover_image: string;
	created_at: string;
}

export interface NewsDto extends Omit<News, 'id' | 'created_at'> {
	id?: number;
}