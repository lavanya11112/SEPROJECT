
import { useState, useEffect } from "react";
import { CategoryTabs } from "@/components/ui/CategoryTabs";
import { MenuItem as MenuItemComponent } from "@/components/ui/MenuItem";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchMenuItems, searchMenuItems } from "@/lib/api";
import { MenuItem, MenuCategory } from "@/types/database";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  // Fetch categories
  const { 
    data: categories = [],
    isLoading: categoriesLoading
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  
  // Create a standardized categories array including "All"
  const allCategories: { id: string; name: string }[] = [
    { id: "all", name: "All" },
    ...categories.map(cat => ({ id: cat.id, name: cat.name }))
  ];
  
  // Fetch menu items based on active category
  const { 
    data: menuItems = [],
    isLoading: menuItemsLoading,
  } = useQuery({
    queryKey: ['menuItems', activeCategory],
    queryFn: () => fetchMenuItems(activeCategory === 'all' ? undefined : activeCategory),
    enabled: !debouncedSearch, // Don't run this query when searching
  });
  
  // Search query for menu items
  const { 
    data: searchResults = [],
    isLoading: searchLoading,
  } = useQuery({
    queryKey: ['searchMenuItems', debouncedSearch],
    queryFn: () => searchMenuItems(debouncedSearch),
    enabled: !!debouncedSearch, // Only run when there's a search query
  });
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // Update filtered items when data changes
  useEffect(() => {
    if (debouncedSearch) {
      setFilteredItems(searchResults);
      
      // When searching, find and set the category if all results belong to same category
      if (searchResults.length > 0) {
        const firstCategoryId = searchResults[0]?.category_id;
        const allSameCategory = searchResults.every(item => item.category_id === firstCategoryId);
        
        if (allSameCategory && firstCategoryId) {
          setActiveCategory(firstCategoryId);
        }
      }
    } else {
      setFilteredItems(menuItems);
    }
  }, [debouncedSearch, searchResults, menuItems]);
  
  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle category changes
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (debouncedSearch) {
      setSearchQuery(''); // Clear search when changing category
      setDebouncedSearch('');
    }
  };
  
  const isLoading = categoriesLoading || menuItemsLoading || searchLoading;
  
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
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          <CategoryTabs
            categories={allCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            className="mb-8"
          />
          
          {isLoading ? (
            <div className="text-center py-16">
              <h3 className="text-lg mb-2">Loading menu items...</h3>
            </div>
          ) : filteredItems.length === 0 ? (
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
