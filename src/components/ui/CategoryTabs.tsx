
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: CategoryTabsProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });
  
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  
  const updateIndicator = () => {
    const activeIndex = categories.findIndex((cat) => cat.id === activeCategory);
    if (activeIndex >= 0 && tabsRef.current[activeIndex]) {
      const activeTab = tabsRef.current[activeIndex];
      if (activeTab && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();
        
        setIndicatorStyle({
          left: tabRect.left - containerRect.left,
          width: tabRect.width,
        });
        
        // Scroll tab into view
        const scrollLeft = activeTab.offsetLeft - containerRef.current.offsetWidth / 2 + tabRect.width / 2;
        containerRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  };
  
  useEffect(() => {
    updateIndicator();
    
    const handleResize = () => {
      updateIndicator();
      checkScrollable();
    };
    
    const checkScrollable = () => {
      if (containerRef.current) {
        setIsScrollable(
          containerRef.current.scrollWidth > containerRef.current.clientWidth
        );
      }
    };
    
    window.addEventListener("resize", handleResize);
    checkScrollable();
    
    return () => window.removeEventListener("resize", handleResize);
  }, [activeCategory, categories]);
  
  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className="flex items-center overflow-x-auto scrollbar-hide py-2 px-1 -mx-1 gap-2 sm:gap-3"
      >
        {categories.map((category, index) => (
          <button
            key={category.id}
            ref={(el) => (tabsRef.current[index] = el)}
            className={cn(
              "whitespace-nowrap px-3 py-2 transition-all rounded-full text-sm font-medium relative",
              "transform transition-transform hover:scale-[1.02] active:scale-[0.98]",
              activeCategory === category.id
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
        
        <div
          className="absolute bottom-2 h-[2px] bg-primary rounded-full transition-all duration-300 transform"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            opacity: indicatorStyle.width ? 1 : 0,
          }}
        />
      </div>
      
      {isScrollable && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </>
      )}
    </div>
  );
}
