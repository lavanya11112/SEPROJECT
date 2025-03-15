
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Utensils, Users, Clock } from "lucide-react";
import { AnimatedImage } from "@/components/ui/AnimatedImage";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthModal } from "@/components/auth/AuthModal";
import { MenuItem, menuItems } from "@/lib/menu-data";

export default function Index() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Get 4 popular items for showcase
  const popularItems = menuItems
    .filter((item) => item.popular)
    .slice(0, 4);
  
  const features = [
    {
      icon: Utensils,
      title: "Premium Quality",
      description:
        "We use only the finest ingredients sourced from trusted suppliers.",
    },
    {
      icon: Users,
      title: "Friendly Service",
      description:
        "Our staff is dedicated to providing you with exceptional dining experience.",
    },
    {
      icon: Clock,
      title: "Quick Delivery",
      description:
        "Fast and reliable delivery to enjoy our delicious food at home.",
    },
  ];
  
  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };
  
  const handleViewMenu = () => {
    navigate("/menu");
  };
  
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-20 min-h-[90vh] flex items-center">
          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <MotionDiv animation="fade-in" className="max-w-xl">
                <div className="mb-2">
                  <span className="tag bg-secondary inline-block mb-4">
                    Premium Dining Experience
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight mb-6">
                  Savor the <span className="relative">Authentic<span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary rounded-full"></span></span> Taste of Excellence
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Experience the perfect blend of tradition and innovation with our carefully crafted menu. Every dish tells a story of passion and dedication.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="rounded-full text-base"
                    onClick={handleViewMenu}
                  >
                    Explore Menu
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full text-base"
                    onClick={openAuthModal}
                  >
                    Sign In
                  </Button>
                </div>
              </MotionDiv>
              
              <MotionDiv
                animation="fade-in"
                delay={300}
                className="relative hidden lg:block"
              >
                <div className="relative aspect-square w-full max-w-lg mx-auto">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <AnimatedImage
                      src="https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                      alt="Delicious food presentation"
                      className="rounded-2xl"
                    />
                  </div>
                  <div
                    className="glass absolute -bottom-6 -right-6 p-4 rounded-xl shadow-sm"
                    style={{ maxWidth: "60%" }}
                  >
                    <p className="text-sm font-medium mb-2">Customer Favorite</p>
                    <h4 className="text-lg font-medium mb-1">
                      Butter Chicken
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Tender chicken in a rich, creamy tomato sauce
                    </p>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </Container>
          
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary clip-path-hero z-0 hidden lg:block"></div>
        </section>
        
        {/* Features Section */}
        <section className="py-24 bg-secondary">
          <Container>
            <MotionDiv animation="fade-in" className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium mb-4">
                Why Choose Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing an exceptional dining experience that keeps you coming back for more.
              </p>
            </MotionDiv>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <MotionDiv
                  key={index}
                  animation="slide-up"
                  delay={index * 100}
                  className="card-hover p-6"
                >
                  <div className="inline-flex items-center justify-center p-3 bg-background rounded-xl mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </MotionDiv>
              ))}
            </div>
          </Container>
        </section>
        
        {/* Popular Items Section */}
        <section className="py-24">
          <Container>
            <div className="flex flex-wrap items-center justify-between mb-12">
              <MotionDiv animation="fade-in" className="max-w-lg mb-6 md:mb-0">
                <span className="tag bg-secondary inline-block mb-4">
                  Customer Favorites
                </span>
                <h2 className="text-3xl md:text-4xl font-medium mb-4">
                  Our Most Popular Dishes
                </h2>
                <p className="text-muted-foreground">
                  Discover what our customers love the most. These dishes have earned their place as the stars of our menu.
                </p>
              </MotionDiv>
              
              <MotionDiv animation="fade-in" delay={200}>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full group"
                  onClick={handleViewMenu}
                >
                  View All Menu
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </MotionDiv>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularItems.map((item, index) => (
                <PopularItemCard
                  key={item.id}
                  item={item}
                  delay={index * 100}
                />
              ))}
            </div>
          </Container>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 bg-secondary relative overflow-hidden">
          <Container className="relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <MotionDiv animation="fade-in">
                <span className="tag bg-background inline-block mb-4">
                  Get Started Today
                </span>
                <h2 className="text-3xl md:text-4xl font-medium mb-6">
                  Ready to Experience Our Culinary Delights?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Create an account to place orders, save your favorites, and enjoy a personalized dining experience.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    size="lg"
                    className="rounded-full text-base"
                    onClick={openAuthModal}
                  >
                    Create Account
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full text-base"
                    onClick={handleViewMenu}
                  >
                    Explore Menu First
                  </Button>
                </div>
              </MotionDiv>
            </div>
          </Container>
          
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-primary"></div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-primary"></div>
          </div>
        </section>
      </main>
      <Footer />
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}

function PopularItemCard({ item, delay }: { item: MenuItem; delay: number }) {
  const navigate = useNavigate();
  
  return (
    <MotionDiv animation="slide-up" delay={delay}>
      <div className="card-hover group h-full flex flex-col">
        <div className="relative aspect-square w-full overflow-hidden">
          <AnimatedImage
            src={item.image}
            alt={item.name}
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium">{item.name}</h3>
            <div className="font-medium text-base ml-2 whitespace-nowrap">
              ${item.price.toFixed(2)}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {item.description}
          </p>
          <div className="mt-auto">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs rounded-full"
              onClick={() => navigate("/menu")}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
