
import { useState } from "react";
import { AnimatedImage } from "./AnimatedImage";
import { MotionDiv } from "./MotionDiv";
import { cn } from "@/lib/utils";

export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  vegetarian?: boolean;
  spicy?: boolean;
  popular?: boolean;
}

interface MenuItemProps {
  item: MenuItemType;
  delay?: number;
  className?: string;
  onClick?: (item: MenuItemType) => void;
}

export function MenuItem({ item, delay = 0, className, onClick }: MenuItemProps) {
  const [hovered, setHovered] = useState(false);
  
  // Converting price to rupees for display (if not already converted)
  const displayPrice = item.price > 100 ? item.price : item.price * 82;
  
  return (
    <MotionDiv
      animation="fade-in"
      delay={delay}
      className={cn("w-full", className)}
    >
      <div
        className={cn(
          "card-hover cursor-pointer group transition-all duration-500",
          "h-full flex flex-col"
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onClick?.(item)}
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <AnimatedImage
            src={item.image}
            alt={item.name}
            className="transition-transform duration-700 ease-out group-hover:scale-105"
            aspectRatio="auto"
          />
          
          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {item.vegetarian && (
              <span className="tag bg-green-100 text-green-800 border border-green-200">
                Veg
              </span>
            )}
            {item.spicy && (
              <span className="tag bg-red-100 text-red-800 border border-red-200">
                Spicy
              </span>
            )}
            {item.popular && (
              <span className="tag bg-amber-100 text-amber-800 border border-amber-200">
                Popular
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col flex-grow p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-lg leading-tight">
              {item.name}
            </h3>
            <div className="font-medium text-base ml-2 whitespace-nowrap">
              ₹{displayPrice.toFixed(0)}
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {item.description}
          </p>
          
          <div className="mt-auto">
            <button 
              className={cn(
                "button-hover w-full py-2 px-4 rounded-md border border-amber-400 bg-amber-50",
                "font-medium text-sm transition-all duration-300",
                "hover:bg-amber-600 hover:text-white"
              )}
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
