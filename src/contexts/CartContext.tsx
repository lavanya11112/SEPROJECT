
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CartItem, MenuItem } from '@/types/database';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (menuItem: MenuItem, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Calculate derived values
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.menu_item?.price || 0) * item.quantity, 
    0
  );

  // Fetch cart items when user changes
  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const fetchCartItems = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart')
        .select(`
          *,
          menu_item:menu_items(*)
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching cart:', error);
        throw error;
      }
      
      // Ensure we always have an array, even if data is null
      setCartItems(data ? data as CartItem[] : []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your cart',
        variant: 'destructive',
      });
      // Set empty array on error to prevent UI issues
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (menuItem: MenuItem, quantity: number) => {
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to add items to cart',
        variant: 'destructive',
      });
      return Promise.reject(new Error('Not authenticated'));
    }

    setLoading(true);
    try {
      // Check if the item is already in the cart
      const existingItem = cartItems.find(item => item.menu_item_id === menuItem.id);
      
      if (existingItem) {
        // Update quantity if already in cart
        const { data, error } = await supabase
          .from('cart')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id)
          .select(`*, menu_item:menu_items(*)`);
          
        if (error) throw error;
        
        // Update local state
        if (data && data[0]) {
          setCartItems(prevItems => 
            prevItems.map(item => 
              item.id === existingItem.id 
                ? data[0] as CartItem
                : item
            )
          );
        } else {
          // Refresh cart items if no data returned
          await fetchCartItems();
        }
      } else {
        // Add new item to cart
        const { data, error } = await supabase
          .from('cart')
          .insert({
            user_id: user.id,
            menu_item_id: menuItem.id,
            quantity,
          })
          .select(`*, menu_item:menu_items(*)`);
          
        if (error) throw error;
        
        // Update local state
        if (data && data[0]) {
          setCartItems(prevItems => [...prevItems, data[0] as CartItem]);
        } else {
          // Refresh cart items if no data returned
          await fetchCartItems();
        }
      }
      
      toast({
        title: 'Added to cart',
        description: `${quantity} x ${menuItem.name} added to your cart`,
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to add item to cart',
        variant: 'destructive',
      });
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (!user) return Promise.reject(new Error('Not authenticated'));
    
    if (quantity <= 0) {
      return removeFromCart(cartItemId);
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart')
        .update({ quantity })
        .eq('id', cartItemId)
        .select(`*, menu_item:menu_items(*)`);
        
      if (error) throw error;
      
      // Update local state
      if (data && data[0]) {
        setCartItems(prevItems => 
          prevItems.map(item => 
            item.id === cartItemId 
              ? data[0] as CartItem
              : item
          )
        );
      } else {
        // Refresh cart items if no data returned
        await fetchCartItems();
      }
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error updating cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to update cart',
        variant: 'destructive',
      });
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    if (!user) return Promise.reject(new Error('Not authenticated'));
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', cartItemId);
        
      if (error) throw error;
      
      // Update local state
      setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
      
      toast({
        title: 'Item removed',
        description: 'Item removed from your cart',
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove item from cart',
        variant: 'destructive',
      });
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) return Promise.reject(new Error('Not authenticated'));
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // Update local state
      setCartItems([]);
      
      toast({
        title: 'Cart cleared',
        description: 'All items have been removed from your cart',
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to clear cart',
        variant: 'destructive',
      });
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
