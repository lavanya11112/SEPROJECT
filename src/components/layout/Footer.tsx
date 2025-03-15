
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { MotionDiv } from "@/components/ui/MotionDiv";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-16 mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <MotionDiv animation="fade-in" delay={0}>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Savoria</h3>
              <p className="text-muted-foreground">
                Experience the taste of authentic cuisine, made with love and served with passion.
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
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors hover-underline inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors hover-underline inline-block">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </MotionDiv>
          
          <MotionDiv animation="fade-in" delay={300}>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>123 Restaurant Street</li>
              <li>New York, NY 10001</li>
              <li>info@savoria.com</li>
              <li>(123) 456-7890</li>
            </ul>
          </MotionDiv>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>© {currentYear} Savoria Restaurant. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
