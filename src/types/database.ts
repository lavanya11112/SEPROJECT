
export interface Profile {
  id: string;
  full_name: string | null;
  phone_number: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  image: string | null;
  created_at: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category_id: string;
  vegetarian: boolean;
  spicy: boolean;
  popular: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  menu_item_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  // Join with menu_items
  menu_item?: MenuItem;
}

export interface Order {
  id: string;
  user_id: string;
  status: string;
  total_amount: number;
  delivery_address: string | null;
  contact_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price: number;
  created_at: string;
  // Join with menu_items
  menu_item?: MenuItem;
}
