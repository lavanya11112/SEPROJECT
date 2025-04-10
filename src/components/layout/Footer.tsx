
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { PrivacyPolicyDialog } from "@/components/dialogs/PrivacyPolicyDialog";
import { TermsOfServiceDialog } from "@/components/dialogs/TermsOfServiceDialog";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false);
  
  return (
    <footer className="bg-secondary py-16 mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <MotionDiv animation="fade-in" delay={0}>
            <div className="space-y-4">
              <Link to="/" className="inline-block">
                <img
                  src="/lovable-uploads/5d9f6631-dd02-4637-9608-ac11baacefcf.png"
                  alt="Flavours of India Logo"
                  className="h-16 mb-2"
                />
              </Link>
              <p className="text-muted-foreground">
                Experience the taste of authentic Indian cuisine, made with love and served with passion.
              </p>
            </div>
          </MotionDiv>
          
          <MotionDiv animation="fade-in" delay={100}>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors hover-underline inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-muted-foreground hover:text-foreground transition-colors hover-underline inline-block">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors hover-underline inline-block">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors hover-underline inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </MotionDiv>
          
          <MotionDiv animation="fade-in" delay={200}>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setIsPrivacyPolicyOpen(true)} 
                  className="text-muted-foreground hover:text-foreground transition-colors hover-underline inline-block"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsTermsOfServiceOpen(true)} 
                  className="text-muted-foreground hover:text-foreground transition-colors hover-underline inline-block"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </MotionDiv>
          
          <MotionDiv animation="fade-in" delay={300}>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Gandhi Nagar, Main Road</li>
              <li>Amalapuram, 533201</li>
              <li>info@flavoursofindia.com</li>
              <li>(123) 456-7890</li>
            </ul>
          </MotionDiv>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>© {currentYear} Flavours of India. All rights reserved.</p>
        </div>
      </Container>

      {/* Dialog components */}
      <PrivacyPolicyDialog 
        isOpen={isPrivacyPolicyOpen} 
        onClose={() => setIsPrivacyPolicyOpen(false)} 
      />
      
      <TermsOfServiceDialog 
        isOpen={isTermsOfServiceOpen} 
        onClose={() => setIsTermsOfServiceOpen(false)} 
      />
    </footer>
  );
}
