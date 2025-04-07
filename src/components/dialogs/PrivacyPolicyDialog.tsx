
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PrivacyPolicyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyDialog({ isOpen, onClose }: PrivacyPolicyDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Privacy Policy</DialogTitle>
          <DialogDescription>Last updated: April 7, 2025</DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4 text-muted-foreground">
          <h3 className="text-lg font-medium text-foreground">1. Introduction</h3>
          <p>
            Flavours of India ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance with this policy. 
            This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.
          </p>
          
          <h3 className="text-lg font-medium text-foreground">2. Information We Collect</h3>
          <p>
            We collect several types of information from and about users of our website, including information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>By which you may be personally identified, such as name, email address, telephone number, or any other identifier by which you may be contacted online or offline ("personal information");</li>
            <li>That is about you but individually does not identify you, such as your preferences and order history;</li>
            <li>About your internet connection, the equipment you use to access our website, and usage details.</li>
          </ul>
          
          <h3 className="text-lg font-medium text-foreground">3. How We Use Your Information</h3>
          <p>
            We use information that we collect about you or that you provide to us, including any personal information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To present our website and its contents to you;</li>
            <li>To provide you with information, products, or services that you request from us;</li>
            <li>To fulfill any other purpose for which you provide it;</li>
            <li>To process and deliver your orders;</li>
            <li>To send you promotional offers and updates about our restaurant.</li>
          </ul>
          
          <h3 className="text-lg font-medium text-foreground">4. Data Security</h3>
          <p>
            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. However, we cannot guarantee that unauthorized third parties will never be able to defeat those measures or use your personal information for improper purposes.
          </p>
          
          <h3 className="text-lg font-medium text-foreground">5. Changes to Our Privacy Policy</h3>
          <p>
            It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the website home page.
          </p>
          
          <h3 className="text-lg font-medium text-foreground">6. Contact Information</h3>
          <p>
            To ask questions or comment about this privacy policy and our privacy practices, contact us at: info@flavoursofindia.com or 123 Restaurant Street, New York, NY 10001.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
