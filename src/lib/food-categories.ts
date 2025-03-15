
export interface FoodCategory {
  id: string;
  name: string;
  image: string;
}

export const foodCategories: FoodCategory[] = [
  { id: "biryani", name: "Biryani", image: "/lovable-uploads/f38bb9f8-a76d-4ed2-9fbc-41b2527a0913.png" },
  { id: "parotta", name: "Parotta", image: "/lovable-uploads/23fefc2c-2075-4c15-a5e1-3b32a3e81235.png" },
  { id: "juice", name: "Juice", image: "/lovable-uploads/07c4633b-7628-4abd-b159-6941ebd3b426.png" },
  { id: "khichdi", name: "Khichdi", image: "/lovable-uploads/940b50b2-b24a-40ba-8b9b-181328c6e0d7.png" },
  { id: "shakes", name: "Shakes", image: "/public/food-categories/shakes.jpg" },
  { id: "sweets", name: "Sweets", image: "/public/food-categories/sweets.jpg" },
  { id: "salads", name: "Salads", image: "/public/food-categories/salads.jpg" },
  { id: "ice-cream", name: "Ice Cream", image: "/public/food-categories/ice-cream.jpg" },
];
