import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Trash2, Minus, Plus, ShoppingBag, Percent } from "lucide-react";
import { AnimatedImage } from "@/components/ui/AnimatedImage";
import { cn } from "@/lib/utils";
import { OrderSuccessModal } from "@/components/modals/OrderSuccessModal";
import { OrderBill } from "@/components/bill/OrderBill";
import { CartItem } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function Cart() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const { user } = useAuth();
  const { cartItems, totalItems, totalAmount, removeFromCart, updateQuantity, clearCart, loading } = useCart();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(cartItemId, newQuantity);
    } else {
      removeFromCart(cartItemId);
    }
  };
  
  const handleRemoveItem = (cartItemId: string) => {
    removeFromCart(cartItemId);
  };
  
  const handleClearCart = () => {
    clearCart();
  };

  const handleApplyPromoCode = () => {
    // Simple promo code logic - you can expand this
    const code = promoCode.toUpperCase();
    if (code === "WELCOME10") {
      const discount = totalAmount * 0.1; // 10% discount
      setAppliedDiscount(discount);
      toast.success("Promo code applied successfully!");
    } else if (code === "SPICY25") {
      const discount = totalAmount * 0.25; // 25% discount
      setAppliedDiscount(discount);
      toast.success("Promo code applied successfully!");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handleOrderSuccess = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const tax = totalAmount * 0.05;
      const finalTotal = totalAmount + tax - appliedDiscount;
      
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: finalTotal,
          status: 'pending',
          delivery_address: user.user_metadata?.address || null,
          contact_number: user.user_metadata?.phone_number || null
        })
        .select()
        .single();
      
      if (orderError) throw orderError;
      
      const orderId = orderData.id;
      
      const orderItemsToInsert = cartItems.map(item => ({
        order_id: orderId,
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        price: item.menu_item?.price || 0
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsToInsert);
      
      if (itemsError) throw itemsError;
      
      setOrderItems([...cartItems]);
      setShowSuccessModal(true);
      setShowBill(true);
      await clearCart();
      
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseBill = () => {
    setShowBill(false);
    setOrderItems([]);
  };

  // Calculate tax and final total
  const tax = totalAmount * 0.05;
  const finalTotal = totalAmount + tax;

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <Container>
          <MotionDiv animation="fade-in" className="mb-12 mt-12">
            <h1 className="text-4xl md:text-5xl font-medium text-center mb-3">
              Your Cart
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Review your selected items before checkout
            </p>
          </MotionDiv>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
              </div>
              <h3 className="text-lg mt-2">Loading your cart...</h3>
            </div>
          ) : cartItems.length === 0 && !showBill ? (
            <div className="text-center py-16">
              <div className="mb-6">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-8">
                  Add some delicious items from our menu to get started
                </p>
                <Button asChild>
                  <Link to="/menu">Browse Menu</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {!showBill ? (
                <>
                  <div className="lg:col-span-2">
                    <div className="bg-white border rounded-lg overflow-hidden">
                      <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="text-lg font-medium">Cart Items ({totalItems})</h2>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-sm"
                          onClick={handleClearCart}
                        >
                          Clear Cart
                        </Button>
                      </div>
                      
                      <div className="divide-y">
                        {cartItems.map((item) => (
                          <div key={item.id} className="p-4 flex items-start gap-4">
                            <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                              <AnimatedImage
                                src={item.menu_item?.image || ""}
                                alt={item.menu_item?.name || ""}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-grow">
                              <h3 className="font-medium">{item.menu_item?.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {item.menu_item?.description?.substring(0, 80)}
                                {(item.menu_item?.description?.length || 0) > 80 ? "..." : ""}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                  <button 
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    className={cn(
                                      "p-1 rounded-full border",
                                      "hover:bg-muted transition-colors"
                                    )}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <button 
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    className={cn(
                                      "p-1 rounded-full border",
                                      "hover:bg-muted transition-colors"
                                    )}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <div className="font-medium">
                                    ₹{((item.menu_item?.price || 0) * item.quantity).toFixed(0)}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-muted-foreground hover:text-destructive h-8 w-8"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-1">
                    <div className="bg-white border rounded-lg overflow-hidden sticky top-24">
                      <div className="p-4 border-b">
                        <h2 className="text-lg font-medium">Order Summary</h2>
                      </div>
                      
                      <div className="p-4">
                        <div className="mb-4">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Enter promo code"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              variant="outline"
                              onClick={handleApplyPromoCode}
                              className="shrink-0"
                            >
                              <Percent className="mr-2 h-4 w-4" />
                              Apply
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>₹{totalAmount.toFixed(0)}</span>
                          </div>
                          {appliedDiscount > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                              <span>Discount</span>
                              <span>-₹{appliedDiscount.toFixed(0)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tax</span>
                            <span>₹{tax.toFixed(0)}</span>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4 mb-6">
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>₹{(finalTotal - appliedDiscount).toFixed(0)}</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full"
                          onClick={handleOrderSuccess}
                          disabled={isProcessing || cartItems.length === 0}
                        >
                          {isProcessing ? "Processing..." : "Place Order"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="lg:col-span-3">
                  <OrderBill items={orderItems} onClose={handleCloseBill} />
                </div>
              )}
            </div>
          )}
        </Container>
      </main>
      <Footer />
      <OrderSuccessModal isOpen={showSuccessModal} onClose={handleCloseModal} />
    </>
  );
}
