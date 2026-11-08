import Image from "next/image";
import { cn } from "@/lib/utils";

export function HumanMoment({
  src,
  alt,
  caption,
  width = 1262,
  height = 1246,
  priority = false,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <figure className={cn("m-0", className)}>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-brand-cream to-white ring-1 ring-border/80">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 360px"
          className={cn(
            "mx-auto h-auto w-full max-h-[22rem] object-contain object-bottom",
            imageClassName,
          )}
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
