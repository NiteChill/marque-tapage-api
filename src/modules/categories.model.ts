export type CategoryType = 'news' | 'favorites';

export interface Category {
  id: number;
  label: string;
  category_type: CategoryType;
}

export interface CategoryDTO {
  id: number;
  label: string;
  category_type: CategoryType;
}
