import type { MenuItem, Category } from "@/types";

// ─────────────────────────────────────────────────────────────
//  data/menuItems.ts  —  All demo menu items in one place
//  Import this wherever you need menu data
// ─────────────────────────────────────────────────────────────

export const DEMO_CATEGORIES: Category[] = [
  { id: "all", name: "All Items", slug: "all", icon: "Grid2X2" },
  { id: "breakfast", name: "Breakfast", slug: "breakfast", icon: "Sun" },
  { id: "starters", name: "Starters", slug: "starters", icon: "Leaf" },
  { id: "mains", name: "Mains", slug: "mains", icon: "Utensils" },
  { id: "desserts", name: "Desserts", slug: "desserts", icon: "Cookie" },
  { id: "drinks", name: "Hot Drinks", slug: "drinks", icon: "Coffee" },
  { id: "soft", name: "Soft Drinks", slug: "soft", icon: "Droplets" },
  { id: "lassi", name: "Lassi", slug: "lassi", icon: "FlaskConical" },
];

export const DEMO_ITEMS: MenuItem[] = [

  // ── BREAKFAST ────────────────────────────────────────────
  {
    id: "b1", name: "Eggs Benedict", price: 1649,
    description: "Poached eggs served on freshly baked bread with hollandaise sauce, salad, and a choice of smoked salmon or smoked chicken.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&q=80",
    is_available: true, is_featured: true, created_at: "",
  },
  {
    id: "b2", name: "Turkish Breakfast", price: 1849,
    description: "Poached eggs garnished with chili oil and garlic, with yogurt. Served with in-house pita bread, hummus, olives, feta, and sun-dried tomatoes.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=600&q=80",
    is_available: true, is_featured: true, created_at: "",
  },
  {
    id: "b3", name: "Shakshuka", price: 1749,
    description: "Eggs cooked on a bed of tomatoes with seasonal spices, onions, and cilantro. Served with pita bread.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "b5", name: "Mediterranean Omelette", price: 1749,
    description: "Feta cheese, bell peppers, tomato, olives, mushrooms, and basil omelette. Served with salad and grilled tomato.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "b6", name: "French Omelette", price: 1649,
    description: "Served with grilled mushroom and salad.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "b7", name: "Skinny Omelette", price: 1649,
    description: "For those on a low-fat diet. Made with egg whites. Served with a side of salad.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "b8", name: "Pakistani Omelette", price: 1649,
    description: "With the spices that give the omelette a flavor like home. Served with bread and butter.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "b9", name: "Cheese Omelette", price: 1649,
    description: "Served with grilled tomato, mushroom, and salad on the side.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "b10", name: "Chicken & Mushroom Crepes", price: 1649,
    description: "Savory crepes with a filling of chicken and mushroom.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "b11", name: "Steak and Eggs on Toast", price: 1849,
    description: "Bits of steak on homemade country bread with eggs. Served with salad on the side.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "b12", name: "The Full Monty", price: 1749,
    description: "Fried Eggs, Sausage, Baked Beans, Hash Brown.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80",
    is_available: true, is_featured: true, created_at: "",
  },
  {
    id: "b13", name: "Blueberry Granola", price: 1649,
    description: "Wholesome yogurt mixed with Blueberries, Toasted Homemade Granola and topped with Honey.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "b15", name: "Blueberry Pancake", price: 1649,
    description: "Fluffy Buttermilk Pancakes with Blueberries drizzled with Maple Syrup and Whipped Cream.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&q=80",
    is_available: true, is_featured: true, created_at: "",
  },
  {
    id: "b16", name: "Crepes Suzette", price: 1649,
    description: "Light Crepes served with a Burnt Orange Sauce and Nutella.",
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },

  // ── STARTERS ────────────────────────────────────────────
  {
    id: "s1", name: "Lobster Bisque", price: 1800,
    description: "Rich, velvety bisque with cognac-flambéed lobster, crème fraîche, and chive oil.",
    category: "starters",
    image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "s2", name: "Burrata & Heritage Tomato", price: 1400,
    description: "Hand-pulled burrata with heritage tomatoes, basil oil, sea salt, and aged balsamic.",
    category: "starters",
    image_url: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },

  // ── MAINS ───────────────────────────────────────────────
  {
    id: "m1", name: "Seared Duck Breast", price: 2400,
    description: "Slow-roasted duck with cherry reduction, crispy shallots, and truffle-scented potato purée.",
    category: "mains",
    image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    is_available: true, is_featured: true, created_at: "",
  },
  {
    id: "m2", name: "Wagyu Striploin 200g", price: 7500,
    description: "Grade A5 Wagyu with bone marrow butter, roasted garlic jus, and seasonal vegetables.",
    category: "mains",
    image_url: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
    is_available: true, is_featured: true, created_at: "",
  },

  // ── DESSERTS ────────────────────────────────────────────
  {
    id: "d1", name: "Chocolate Fondant", price: 1200,
    description: "Warm dark chocolate heart with salted caramel ice cream and gold leaf.",
    category: "desserts",
    image_url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
    is_available: true, is_featured: true, created_at: "",
  },

  // ── HOT DRINKS ──────────────────────────────────────────
  {
    id: "dr1", name: "Cappuccino", price: 749,
    description: "Classic Italian espresso with steamed milk and rich foam.",
    category: "drinks",
    image_url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "dr2", name: "Caramel Cappuccino", price: 849,
    description: "Espresso with steamed milk, foam, and a drizzle of golden caramel.",
    category: "drinks",
    image_url: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "dr3", name: "Vanilla Cappuccino", price: 849,
    description: "Smooth cappuccino with a hint of Madagascar vanilla.",
    category: "drinks",
    image_url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "dr4", name: "Latte", price: 649,
    description: "Espresso topped with silky steamed milk.",
    category: "drinks",
    image_url: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "dr5", name: "Vanilla Latte", price: 799,
    description: "Creamy latte with a touch of vanilla sweetness.",
    category: "drinks",
    image_url: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "dr6", name: "Caramel Latte", price: 799,
    description: "Espresso, steamed milk, and rich caramel syrup.",
    category: "drinks",
    image_url: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "dr7", name: "Mocha", price: 699,
    description: "Espresso blended with chocolate and steamed milk. A coffee lover's indulgence.",
    category: "drinks",
    image_url: "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "dr8", name: "Flat White", price: 649,
    description: "Strong ristretto shots with velvety micro-foam milk.",
    category: "drinks",
    image_url: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "dr9", name: "Americano", price: 599,
    description: "Espresso shots diluted with hot water for a smooth, clean cup.",
    category: "drinks",
    image_url: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "dr10", name: "Macchiato", price: 699,
    description: "Espresso marked with a dollop of foamed milk.",
    category: "drinks",
    image_url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "dr11", name: "Hot Chocolate", price: 749,
    description: "Rich Belgian chocolate melted into steamed milk. Pure comfort.",
    category: "drinks",
    image_url: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "dr12", name: "Espresso Shot", price: 549,
    description: "Single or double shot of freshly pulled espresso.",
    category: "drinks",
    image_url: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "dr13", name: "Green Tea", price: 350,
    description: "Premium Japanese green tea, delicately brewed.",
    category: "drinks",
    image_url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "dr14", name: "Tea", price: 350,
    description: "Classic doodh pati chai, brewed strong and served hot.",
    category: "drinks",
    image_url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },

  // ── SOFT DRINKS ─────────────────────────────────────────
  {
    id: "sd1", name: "Pepsi", price: 185,
    description: "Ice cold Pepsi, perfectly chilled.",
    category: "soft",
    image_url: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "sd2", name: "7UP", price: 185,
    description: "Crisp and refreshing lemon-lime soda.",
    category: "soft",
    image_url: "https://images.unsplash.com/photo-1543253687-c931c8e01820?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "sd3", name: "Mountain Dew", price: 185,
    description: "Bold citrus flavor with a refreshing kick.",
    category: "soft",
    image_url: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "sd4", name: "Sting", price: 260,
    description: "Energy drink with a burst of strawberry flavor.",
    category: "soft",
    image_url: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "sd5", name: "Mirinda", price: 185,
    description: "Sweet and fruity orange fizzy drink.",
    category: "soft",
    image_url: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "sd6", name: "Mineral Water (S)", price: 149,
    description: "Still mineral water, small bottle.",
    category: "soft",
    image_url: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "sd7", name: "Mineral Water (L)", price: 195,
    description: "Still mineral water, large bottle.",
    category: "soft",
    image_url: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },

  // ── LASSI ───────────────────────────────────────────────
  {
    id: "l1", name: "Sweet Lassi", price: 450,
    description: "Chilled, creamy yogurt drink blended with sugar and rose water.",
    category: "lassi",
    image_url: "https://images.unsplash.com/photo-1571805529673-0f56b922b359?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },
  {
    id: "l2", name: "Salty Lassi", price: 450,
    description: "Refreshing salted yogurt drink with a hint of roasted cumin.",
    category: "lassi",
    image_url: "https://images.unsplash.com/photo-1571805529673-0f56b922b359?w=600&q=80",
    is_available: true, is_featured: false, created_at: "",
  },

];