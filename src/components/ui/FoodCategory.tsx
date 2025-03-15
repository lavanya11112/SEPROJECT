
import { cn } from "@/lib/utils";
import { MotionDiv } from "./MotionDiv";

interface FoodCategoryProps {
  name: string;
  image: string;
  onClick?: () => void;
  className?: string;
}

export function FoodCategory({ 
  name, 
  image, 
  onClick, 
  className 
}: FoodCategoryProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 cursor-pointer snap-center",
        "transition-transform hover:scale-105 active:scale-95",
        className
      )}
      onClick={onClick}
    >
      <MotionDiv
        animation="fade-in"
        className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-white shadow-md border border-amber-100"
      >
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover" 
        />
      </MotionDiv>
      <span className="text-sm font-medium text-center">{name}</span>
    </div>
  );
}
