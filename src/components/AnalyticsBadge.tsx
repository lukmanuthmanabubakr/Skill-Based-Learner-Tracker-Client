export default function AnalyticsBadge() {
  return (
    <div className="relative flex items-center gap-2 overflow-hidden select-none rounded-full px-2 py-1">
      {/* Shimmer overlay */}
      <span
        className="
          absolute inset-0
          bg-gradient-to-r from-transparent via-black/10 to-transparent
          dark:via-white/10
          animate-shimmer
          pointer-events-none
        "
      />

      {/* Icon */}
      <div className="h-7 w-7 rounded-full grid place-items-center border border-border bg-bg relative z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-text"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 19V11" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 19V14" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 19V9" />
        </svg>
      </div>

      {/* Text */}
      <span className="text-sm font-medium text-text relative z-10">Analytics</span>
    </div>
  );
}
