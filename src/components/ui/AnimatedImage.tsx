
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "wide";
  loadingClassName?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  delay?: number;
}

export function AnimatedImage({
  src,
  alt,
  className,
  aspectRatio = "auto",
  loadingClassName,
  objectFit = "cover",
  delay = 0,
  ...props
}: AnimatedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay]);

  const aspectRatioClasses = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[16/9]",
  };

  const objectFitClasses = {
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
  };

  if (!shouldRender) {
    return (
      <div
        className={cn(
          "blur-load",
          aspectRatioClasses[aspectRatio],
          loadingClassName
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={cn(
        "blur-load",
        loaded && "loaded",
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-full w-full transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          objectFitClasses[objectFit]
        )}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
}
