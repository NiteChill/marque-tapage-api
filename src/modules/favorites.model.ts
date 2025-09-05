export interface Favorite {
  id: number;
  title: string;
  thumbnail_path: string;
  content: string;
  created_at: Date;
  price: number;
  rating: number;
  categories: string[];
}

export interface FavoriteDTO {
  id: number;
  title: string;
  thumbnail_path: string;
  content: string;
  created_at: Date;
  price: number;
  rating: number;
  categories: string[];
}
