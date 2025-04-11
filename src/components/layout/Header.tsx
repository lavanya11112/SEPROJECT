
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, ShoppingBag, LogOut } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const { user, signOut, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const handleOpenAuthModal = () => setIsAuthModalOpen(true);
  const handleCloseAuthModal = () => setIsAuthModalOpen(false);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      // Note: Navigation is handled in signOut method now
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = "";
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  const handleAuthClick = () => {
    if (location.pathname === '/auth') {
      return; // Already on auth page
    }
    navigate('/auth');
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = "";
    }
  };
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center"
          >
            <img 
              src="/lovable-uploads/5d9f6631-dd02-4637-9608-ac11baacefcf.png" 
              alt="Flavours of India Logo" 
              className="h-10 mr-2" 
            />
            <span className="text-xl font-display font-medium tracking-tight hidden md:inline">
              Flavours of India
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="h-9 w-24 bg-muted animate-pulse rounded-full"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <User className="h-5 w-5 mr-2" />
                    {user.user_metadata?.full_name || 'Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="w-full cursor-pointer">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-500 cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" className="rounded-full" onClick={handleAuthClick}>
                <User className="h-5 w-5 mr-2" />
                Sign In
              </Button>
            )}
            <Button size="sm" className="rounded-full" asChild>
              <Link to="/cart">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Order
              </Link>
            </Button>
          </div>
          
          <button
            className="md:hidden p-2 -mr-2 text-foreground"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>
      
      <div
        className={cn(
          "fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          <nav className="flex flex-col space-y-6 mb-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-lg font-medium py-2 transition-colors",
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="border-t border-border mt-6 pt-6 space-y-4">
            {loading ? (
              <div className="h-12 bg-muted animate-pulse rounded-md"></div>
            ) : user ? (
              <>
                <Button variant="outline" className="w-full justify-start" size="lg" asChild>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="h-5 w-5 mr-3" />
                    Profile
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                size="lg" 
                onClick={handleAuthClick}
              >
                <User className="h-5 w-5 mr-3" />
                Sign In
              </Button>
            )}
            <Button className="w-full justify-start" size="lg" asChild>
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                <ShoppingBag className="h-5 w-5 mr-3" />
                Order Now
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleCloseAuthModal}
        defaultTab="login"
      />
    </header>
  );
}
