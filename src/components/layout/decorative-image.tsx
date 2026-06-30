import Image from "next/image";
import { cn } from "@/lib/utils";

type DecorativeImageProps = {
  src: string;
  alt?: string;
  className?: string;
  width: number;
  height: number;
  priority?: boolean;
};

export function DecorativeImage({
  src,
  alt = "",
  className,
  width,
  height,
  priority,
}: DecorativeImageProps) {
  return (
    <Image
      alt={alt}
      aria-hidden={alt ? undefined : true}
      className={cn("pointer-events-none select-none", className)}
      height={height}
      priority={priority}
      src={src}
      width={width}
    />
  );
}
