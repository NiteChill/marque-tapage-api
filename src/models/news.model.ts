export interface News {
	id: number;
	title: string;
	content: string;
	created_at: string;
}

export interface newNews extends Omit<News, 'id' | 'created_at'> {}
