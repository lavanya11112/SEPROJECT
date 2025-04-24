
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PaymentButtonProps {
  amount: number;
  planId?: string;
  type?: 'one_time' | 'recurring';
  className?: string;
  children?: React.ReactNode;
  maxRetries?: number;
  onSuccess?: () => void;  // Added this prop
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function PaymentButton({ 
  amount, 
  planId, 
  type = 'one_time',
  className,
  children,
  maxRetries = 3,
  onSuccess  // Using the new prop
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to continue with the payment",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await supabase.functions.invoke('handle-razorpay', {
        body: {
          amount,
          type,
          planId,
          userId: user.id,
          maxRetries
        },
      });

      if (response.error) throw response.error;
      const { orderId } = response.data;

      const options = {
        key: 'rzp_test_BHwVxgnFNSfosE',
        amount: amount * 100,
        currency: 'INR',
        name: 'Your Restaurant Name',
        description: type === 'recurring' ? 'Subscription Payment' : 'One-time Payment',
        order_id: orderId,
        handler: async (response: any) => {
          toast({
            title: "Payment successful",
            description: "Your payment has been processed successfully",
          });
          
          // Call the onSuccess callback if provided
          if (onSuccess) {
            onSuccess();
          }
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: '#10B981',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      toast({
        title: "Payment failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePayment} 
      disabled={loading}
      className={className}
    >
      {loading ? "Processing..." : children || "Pay Now"}
    </Button>
  );
}
