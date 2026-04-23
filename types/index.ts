export type MenuItem = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  isAvailable: boolean;
  isFeatured: boolean;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Restaurant {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  hours: string;
}
