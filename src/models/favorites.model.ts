export interface Favorite {
	id: number;
	title: string;
	author: string;
	cover_image: string;
	description: string;
	price: number;
	note: number;
	created_at: string;
}

export interface FavoriteDto extends Omit<Favorite, 'id' | 'created_at'> {
	id?: number;
}
