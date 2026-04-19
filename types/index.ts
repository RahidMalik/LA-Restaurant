export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface Restaurant {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  hours: string;
}
