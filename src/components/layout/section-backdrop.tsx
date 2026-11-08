export function SectionBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -left-24 top-0 size-72 rounded-full bg-brand-mint/35 blur-3xl motion-safe:animate-[float_8s_ease-in-out_infinite]" />
      <div className="absolute -right-16 top-32 size-80 rounded-full bg-brand-green/10 blur-3xl motion-safe:animate-[float_10s_ease-in-out_infinite_reverse]" />
      <div className="absolute bottom-0 left-1/3 size-64 rounded-full bg-brand-navy/5 blur-3xl" />
    </div>
  );
}
