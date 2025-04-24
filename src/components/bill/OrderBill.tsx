import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CartItem } from "@/types/database";
import { X, Printer } from "lucide-react";

interface OrderBillProps {
  items: CartItem[];
  onClose: () => void;
  totalAmount?: number;
}

export function OrderBill({ items, onClose, totalAmount }: OrderBillProps) {
  const subtotal = items.reduce((total, item) => 
    total + (item.menu_item?.price || 0) * item.quantity, 
    0
  );
  const tax = subtotal * 0.05;
  const total = totalAmount || (subtotal + tax);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-8 bg-white/5 backdrop-blur-lg border-orange-500/20">
      <CardHeader className="border-b border-orange-500/20 flex flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex-1">
                <p className="font-medium">{item.menu_item?.name}</p>
                <p className="text-sm text-muted-foreground">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-medium">₹{((item.menu_item?.price || 0) * item.quantity).toFixed(0)}</p>
            </div>
          ))}
          <div className="pt-4 space-y-2 border-t">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (5%)</span>
              <span>₹{tax.toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-2 border-t">
              <span>Total</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 pt-6">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print Bill
        </Button>
      </CardFooter>
    </Card>
  );
}
