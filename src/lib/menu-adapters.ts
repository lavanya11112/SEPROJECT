
import { MenuItem as MenuDataItem } from "@/lib/menu-data";
import { MenuItem as DatabaseMenuItem } from "@/types/database";

// Converts a menu-data MenuItem to a database MenuItem
export function adaptMenuItemToDatabase(menuItem: MenuDataItem): DatabaseMenuItem {
  return {
    id: menuItem.id,
    name: menuItem.name,
    description: menuItem.description,
    price: menuItem.price,
    image: menuItem.image,
    category_id: menuItem.category, // Using category as category_id
    vegetarian: menuItem.vegetarian || false,
    spicy: menuItem.spicy || false,
    popular: menuItem.popular || false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

// Converts a database MenuItem to a menu-data MenuItem
export function adaptDatabaseToMenuItem(dbItem: DatabaseMenuItem): MenuDataItem {
  return {
    id: dbItem.id,
    name: dbItem.name,
    description: dbItem.description || "",
    price: dbItem.price,
    image: dbItem.image || "",
    category: dbItem.category_id,
    vegetarian: dbItem.vegetarian,
    spicy: dbItem.spicy,
    popular: dbItem.popular
  };
}
