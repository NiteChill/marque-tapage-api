export interface News {
  id: number;
  title: string;
  thumbnail_path: string;
  content: string;
  created_at: Date;
  categories: string[];
}

export interface NewsDTO {
  id: number;
  title: string;
  thumbnail_path: string;
  content: string;
  created_at: Date;
  categories: string[];
}
