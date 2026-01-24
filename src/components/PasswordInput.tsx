import { useState } from "react";

interface Props {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function PasswordInput({ value, onChange, placeholder }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder || "••••••••"}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-border bg-bg px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-border"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition"
      >
        {show ? (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 
              0 8.268 2.943 9.542 7-1.274 
              4.057-5.065 7-9.542 7-4.477 
              0-8.268-2.943-9.542-7z" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 
              0-8.268-2.943-9.543-7a9.94 9.94 0 012.124-3.494M6.75 
              6.75A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 
              9.543 7-.41 1.307-1.047 2.497-1.87 3.513M9.88 
              9.88a3 3 0 104.24 4.24" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M3 3l18 18" />
          </svg>
        )}
      </button>
    </div>
  );
}
