import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const toggle = () => {
    const newDark = !isDark;

    const html = document.documentElement;
    html.classList.toggle("dark", newDark);

    localStorage.setItem("theme", newDark ? "dark" : "light");

    setIsDark(newDark);
  };

  return (
    <button
      onClick={toggle}
   className="
  p-2 rounded-full
  border border-border
  bg-card text-text
  shadow-sm
  hover:bg-border/20
  hover:scale-110
  active:scale-95
  transition-all
"

    >
      <div
        className={`transition-transform duration-300 ${
          isDark ? "rotate-90 opacity-100" : "opacity-100"
        }`}
      >
        {isDark ? (
          /*   */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            />
          </svg>
        ) : (
          /* Sun icon */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="4" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
