
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  vegetarian?: boolean;
  spicy?: boolean;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: "all", name: "All" },
  { id: "starters", name: "Starters" },
  { id: "soups", name: "Soups" },
  { id: "main-course", name: "Main Course" },
  { id: "biryani", name: "Biryani" },
  { id: "bread", name: "Bread" },
  { id: "desserts", name: "Desserts" },
  { id: "beverages", name: "Beverages" },
];

export const menuItems: MenuItem[] = [
  {
    id: "item1",
    name: "Paneer Tikka",
    description: "Chunks of cottage cheese marinated in yogurt and spices, grilled to perfection.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "starters",
    vegetarian: true,
    popular: true,
  },
  {
    id: "item2",
    name: "Chicken Tikka",
    description: "Tender pieces of chicken marinated in spiced yogurt and grilled in a tandoor.",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "starters",
    popular: true,
  },
  {
    id: "item3",
    name: "Tomato Soup",
    description: "Fresh tomatoes blended with herbs and cream for a comforting experience.",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "soups",
    vegetarian: true,
  },
  {
    id: "item4",
    name: "Mulligatawny Soup",
    description: "Traditional Indian soup made with lentils, vegetables, and spices.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "soups",
    vegetarian: true,
    spicy: true,
  },
  {
    id: "item5",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with tender chicken, herbs, and aromatic spices.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "biryani",
    spicy: true,
    popular: true,
  },
  {
    id: "item6",
    name: "Vegetable Biryani",
    description: "Mixed vegetables and basmati rice cooked with saffron and whole spices.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "biryani",
    vegetarian: true,
    spicy: true,
  },
  {
    id: "item7",
    name: "Butter Chicken",
    description: "Tender chicken cooked in a rich, creamy tomato sauce with butter and spices.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "main-course",
    popular: true,
  },
  {
    id: "item8",
    name: "Palak Paneer",
    description: "Cottage cheese cubes in a creamy spinach gravy flavored with garlic and spices.",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1596797038530-2c107aa8e1fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "main-course",
    vegetarian: true,
  },
  {
    id: "item9",
    name: "Garlic Naan",
    description: "Soft leavened bread topped with garlic and butter, baked in a tandoor.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1633962796940-8e7649de3191?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "bread",
    vegetarian: true,
  },
  {
    id: "item10",
    name: "Gulab Jamun",
    description: "Soft milk solids dumplings soaked in rose flavored sugar syrup.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1601303516534-bf0b1eb77db3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "desserts",
    vegetarian: true,
    popular: true,
  },
  {
    id: "item11",
    name: "Mango Lassi",
    description: "Refreshing yogurt drink blended with sweet mangoes and a hint of cardamom.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "beverages",
    vegetarian: true,
  },
  {
    id: "item12",
    name: "Rogan Josh",
    description: "A classic Kashmiri curry made with tender lamb pieces and aromatic spices.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "main-course",
    spicy: true,
  },
];

export function getMenuItemsByCategory(categoryId: string): MenuItem[] {
  if (categoryId === "all") {
    return menuItems;
  }
  
  return menuItems.filter((item) => item.category === categoryId);
}
