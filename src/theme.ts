export function initTheme() {
  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    document.documentElement.classList.add("dark");
  } else if (saved === "light") {
    document.documentElement.classList.remove("dark");
  }
}
