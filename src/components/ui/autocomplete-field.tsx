"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronsUpDown, Loader2 } from "lucide-react";
import { FloatingField, FormTextInput } from "@/components/ui/form-controls";
import { cn } from "@/lib/utils";

export type AutocompleteOption = {
  code: string;
  name: string;
};

export function AutocompleteField({
  id,
  label,
  helper,
  error,
  value,
  displayValue,
  options,
  loading,
  disabled,
  placeholder,
  emptyMessage = "Nenhum resultado",
  onQueryChange,
  onSelect,
  onClear,
}: {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  value: string;
  displayValue: string;
  options: AutocompleteOption[];
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  emptyMessage?: string;
  onQueryChange: (query: string) => void;
  onSelect: (option: AutocompleteOption) => void;
  onClear: () => void;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const showList = open && !disabled;

  useEffect(() => {
    if (!showList) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [showList]);

  useEffect(() => {
    setActiveIndex(0);
  }, [options]);

  const activeOption = useMemo(
    () => options[activeIndex] ?? null,
    [options, activeIndex],
  );

  return (
    <FloatingField id={id} label={label} helper={helper} error={error}>
      <div ref={rootRef} className="relative">
        <FormTextInput
          id={id}
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder || label}
          error={!!error}
          value={
            open
              ? displayValue.length > 0
                ? displayValue
                : value
              : value || displayValue
          }
          onFocus={() => {
            if (!disabled) setOpen(true);
          }}
          onChange={(e) => {
            onQueryChange(e.target.value);
            if (value) onClear();
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (!showList) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, Math.max(options.length - 1, 0)));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter" && activeOption) {
              e.preventDefault();
              onSelect(activeOption);
              setOpen(false);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          className="pr-11"
        />
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          {loading ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <ChevronsUpDown className="size-4" aria-hidden />
          )}
        </span>

        {showList ? (
          <ul
            id={listId}
            role="listbox"
            className={cn(
              "absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-border/80 bg-white py-1 shadow-[var(--shadow-elevated,0_12px_40px_rgb(16_45_48/0.12))]",
            )}
          >
            {loading && options.length === 0 ? (
              <li className="px-4 py-3 text-sm text-muted-foreground">
                Carregando…
              </li>
            ) : null}
            {!loading && options.length === 0 ? (
              <li className="px-4 py-3 text-sm text-muted-foreground">
                {emptyMessage}
              </li>
            ) : null}
            {options.map((option, index) => {
              const selected = option.name === value;
              const active = index === activeIndex;
              return (
                <li key={`${option.code}-${option.name}`} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full px-4 py-2.5 text-left text-sm text-brand-ink",
                      active && "bg-brand-cream",
                      selected && "font-semibold text-brand-green",
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      onSelect(option);
                      setOpen(false);
                    }}
                  >
                    {option.name}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </FloatingField>
  );
}
