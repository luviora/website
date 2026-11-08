import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[calc(1240px+2rem)] px-4 sm:px-6", className)}
    >
      {children}
    </div>
  );
}
