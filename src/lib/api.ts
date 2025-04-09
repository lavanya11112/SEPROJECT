
import { supabase } from "@/integrations/supabase/client";
import { MenuCategory, MenuItem } from "@/types/database";

export async function fetchCategories(): Promise<MenuCategory[]> {
  const { data, error } = await supabase
    .from('menu_categories')
    .select('*')
    .order('name');
    
  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
  
  return data || [];
}

export async function fetchMenuItems(categoryId?: string): Promise<MenuItem[]> {
  // Use a cached query approach
  let query = supabase
    .from('menu_items')
    .select('*');
    
  if (categoryId && categoryId !== 'all') {
    query = query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query.order('name');
    
  if (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
  
  return data || [];
}

export async function searchMenuItems(query: string): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('name');
    
  if (error) {
    console.error('Error searching menu items:', error);
    throw error;
  }
  
  return data || [];
}
