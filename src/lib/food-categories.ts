
export interface FoodCategory {
  id: string;
  name: string;
  image: string;
}

export const foodCategories: FoodCategory[] = [
  { id: "biryani", name: "Biryani", image: "/lovable-uploads/f38bb9f8-a76d-4ed2-9fbc-41b2527a0913.png" },
  { id: "parotta", name: "Parotta", image: "/public/food-categories/parotta.jpg" },
  { id: "juice", name: "Juice", image: "/public/food-categories/juice.jpg" },
  { id: "khichdi", name: "Khichdi", image: "/public/food-categories/khichdi.jpg" },
  { id: "shakes", name: "Shakes", image: "/public/food-categories/shakes.jpg" },
  { id: "sweets", name: "Sweets", image: "/public/food-categories/sweets.jpg" },
  { id: "salads", name: "Salads", image: "/public/food-categories/salads.jpg" },
  { id: "ice-cream", name: "Ice Cream", image: "/public/food-categories/ice-cream.jpg" },
];
