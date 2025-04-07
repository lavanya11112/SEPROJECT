
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface TermsOfServiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfServiceDialog({ isOpen, onClose }: TermsOfServiceDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Terms of Service</DialogTitle>
          <DialogDescription>Last updated: April 7, 2025</DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4 text-muted-foreground">
          <h3 className="text-lg font-medium text-foreground">1. Acceptance of Terms</h3>
          <p>
            By accessing or using the Flavours of India website and services, you agree to be bound by these Terms of Service. 
            If you do not agree to all of these terms, you may not access or use our services.
          </p>
          
          <h3 className="text-lg font-medium text-foreground">2. Ordering and Payment</h3>
          <p>
            When you place an order through our website, you are offering to purchase the products you have selected based on these Terms of Service. We reserve the right to refuse or cancel any orders for any reason, including but not limited to product availability, errors in product or pricing information, or issues with payment processing.
          </p>
          <p>
            Payment for all orders must be made through the payment methods we offer. By providing payment information, you represent and warrant that you have the legal right to use the payment method you provide.
          </p>
          
          <h3 className="text-lg font-medium text-foreground">3. Delivery and Pickup</h3>
          <p>
            We provide estimated delivery or pickup times, but these are not guaranteed. Factors outside our control, such as weather, traffic, or high order volume, may affect these times. We are not responsible for delays that are beyond our reasonable control.
          </p>
          
          <h3 className="text-lg font-medium text-foreground">4. User Accounts</h3>
          <p>
            When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account.
          </p>
          
          <h3 className="text-lg font-medium text-foreground">5. Intellectual Property</h3>
          <p>
            All content included on our website, such as text, graphics, logos, images, and software, is the property of Flavours of India or its content suppliers and is protected by copyright and other intellectual property laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
          </p>
          
          <h3 className="text-lg font-medium text-foreground">6. Limitation of Liability</h3>
          <p>
            In no event shall Flavours of India, its officers, directors, employees, or agents be liable for any indirect, punitive, incidental, special, or consequential damages arising out of, or in any way connected with, your use of or inability to use our services.
          </p>
          
          <h3 className="text-lg font-medium text-foreground">7. Changes to Terms</h3>
          <p>
            We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting an announcement on our website. Your continued use of our services after any changes indicates your acceptance of the new terms.
          </p>
          
          <h3 className="text-lg font-medium text-foreground">8. Governing Law</h3>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the State of New York, without giving effect to any principles of conflicts of law.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
