
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { AnimatedImage } from "@/components/ui/AnimatedImage";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <Container>
          <section className="py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-medium mb-6 font-display">Our Story</h1>
                <p className="text-lg mb-6 text-muted-foreground">
                  Welcome to Flavours of India, where culinary traditions from across the Indian subcontinent 
                  come together to create an authentic dining experience. Our restaurant was founded in 1995 
                  by the Sharma family, who brought their cherished family recipes from their small village 
                  in Northern India.
                </p>
                <p className="text-lg mb-6 text-muted-foreground">
                  For over 25 years, we've been serving dishes that capture the essence of India's diverse 
                  regional cuisines. From the fiery curries of the south to the aromatic biryanis of the north, 
                  each dish tells a story of heritage and passion.
                </p>
                <Button size="lg" className="rounded-full mt-2" asChild>
                  <Link to="/menu">Explore Our Menu</Link>
                </Button>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <AnimatedImage 
                  src="/lovable-uploads/about.jpg" 
                  alt="Traditional Indian cooking" 
                  className="w-full h-full"
                  aspectRatio="wide"
                />
              </div>
            </div>
          </section>

          <section className="py-12 border-t border-border">
            <h2 className="text-2xl md:text-3xl font-medium mb-8 text-center font-display">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-amber-50 p-6 rounded-lg text-center">
                <h3 className="text-xl font-medium mb-3">Authentic Flavors</h3>
                <p className="text-muted-foreground">
                  We use traditional spices, cooking methods, and recipes passed down through generations.
                </p>
              </div>
              <div className="bg-amber-50 p-6 rounded-lg text-center">
                <h3 className="text-xl font-medium mb-3">Fresh Ingredients</h3>
                <p className="text-muted-foreground">
                  We source locally grown produce and the finest spices to ensure quality in every dish.
                </p>
              </div>
              <div className="bg-amber-50 p-6 rounded-lg text-center">
                <h3 className="text-xl font-medium mb-3">Family Experience</h3>
                <p className="text-muted-foreground">
                  We believe in treating every guest as family, creating a warm and welcoming atmosphere.
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16 border-t border-border">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <AnimatedImage 
                      src="/lovable-uploads/adde90a1-6bd0-436b-9c2f-d1ff468602df.png" 
                      alt="Traditional Indian restaurant seating" 
                      className="w-full h-full"
                      aspectRatio="square"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <AnimatedImage 
                      src="/lovable-uploads/940b50b2-b24a-40ba-8b9b-181328c6e0d7.png" 
                      alt="Indian spices and ingredients" 
                      className="w-full h-full"
                      aspectRatio="square"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg col-span-2">
                    <AnimatedImage 
                      src="/lovable-uploads/23fefc2c-2075-4c15-a5e1-3b32a3e81235.png" 
                      alt="Traditional Indian village setting" 
                      className="w-full h-full"
                      aspectRatio="video"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-medium mb-6 font-display">Our Restaurant</h2>
                <p className="text-lg mb-6 text-muted-foreground">
                  Step into our restaurant and be transported to the vibrant villages of India. Our decor 
                  reflects the colorful traditions and rustic charm of rural Indian life, with handcrafted 
                  furnishings and authentic artifacts collected from across the country.
                </p>
                <p className="text-lg mb-6 text-muted-foreground">
                  Our dining room features comfortable seating areas designed to accommodate both intimate 
                  dinners and larger family gatherings. The warm lighting and traditional music create the 
                  perfect ambiance for enjoying our flavorful cuisine.
                </p>
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
