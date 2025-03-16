
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
  { id: "shakes", name: "Shakes", image: "/lovable-uploads/0f2137eb-422e-4daa-8213-8612b6505400.png" },
  { id: "sweets", name: "Sweets", image: "/lovable-uploads/9e2eeb87-a06a-4e7e-b2c2-300ad5c1e83b.png" },
  { id: "salads", name: "Salads", image: "/lovable-uploads/adde90a1-6bd0-436b-9c2f-d1ff468602df.png" },
  { id: "ice-cream", name: "Ice Cream", image: "/lovable-uploads/2380be38-945d-4e2e-99d1-5098b1704664.png" },
];
