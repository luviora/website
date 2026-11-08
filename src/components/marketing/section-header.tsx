import { cn } from "@/lib/utils";

export function SectionHeader({
  label,
  title,
  description,
  className,
  titleClassName,
}: {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {label ? (
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-brand-green">
          {label}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-[clamp(1.75rem,3.2vw,2.15rem)] font-bold tracking-[-0.025em] text-brand-navy",
          label ? "mt-3" : "",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
