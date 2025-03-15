
import { useState, useEffect } from "react";
import { CategoryTabs } from "@/components/ui/CategoryTabs";
import { MenuItem as MenuItemComponent } from "@/components/ui/MenuItem";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { categories, getMenuItemsByCategory, MenuItem } from "@/lib/menu-data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  
  useEffect(() => {
    const items = getMenuItemsByCategory(activeCategory);
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      setFilteredItems(
        items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredItems(items);
    }
  }, [activeCategory, searchQuery]);
  
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };
  
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <Container>
          <MotionDiv animation="fade-in" className="mb-16 mt-12">
            <h1 className="text-4xl md:text-5xl font-medium text-center mb-3">
              Our Menu
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Explore our carefully crafted dishes made with the freshest ingredients and authentic recipes.
            </p>
          </MotionDiv>
          
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search menu..."
                className="pl-10 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            className="mb-8"
          />
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-lg mb-2">No items found</h3>
              <p className="text-muted-foreground">
                Try changing your search query or selecting a different category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredItems.map((item, index) => (
                <MenuItemComponent
                  key={item.id}
                  item={item}
                  delay={index * 100}
                />
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
