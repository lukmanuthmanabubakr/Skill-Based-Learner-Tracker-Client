import { useEffect, useRef, useState } from "react";

type Option<T extends string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  label: string;
  value: T;
  options: readonly Option<T>[];
  onChange: (value: T) => void;
};

export default function Dropdown<T extends string>({
  label,
  value,
  options,
  onChange,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="space-y-1" ref={ref}>
      <label className="text-sm">{label}</label>

      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-left outline-none focus:ring-2 focus:ring-border transition flex items-center justify-between active:scale-[0.99]"
      >
        <span className="text-sm">{selected.label}</span>

        <span
          className={`text-muted transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* Dropdown panel (animated) */}
      <div className="relative">
        <div
          className={[
            "absolute z-50 mt-2 w-full rounded-xl border border-border",
            "bg-card/60 backdrop-blur-md shadow-lg overflow-hidden",
            "origin-top transition-all duration-200",
            open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-[0.98] -translate-y-1 pointer-events-none",
          ].join(" ")}
        >
          {options.map((opt) => {
            const active = opt.value === value;

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={[
                  "w-full px-3 py-2 text-left text-sm transition flex items-center justify-between",
                  "hover:bg-border/10 active:scale-[0.99]",
                  active ? "bg-border/20" : "",
                ].join(" ")}
              >
                <span>{opt.label}</span>


                <span
                  className={[
                    "text-xs text-muted transition-opacity",
                    active ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  ✓
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
