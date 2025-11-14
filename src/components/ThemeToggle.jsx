import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { STORAGE_KEYS, THEME_CLASS, Z_INDEX } from "@/data/constants";

/**
 * ThemeToggle component - Fixed button to toggle between light and dark themes
 *
 * Features:
 * - Persists theme preference to localStorage
 * - Adds/removes 'dark' class on document root
 * - Smooth icon transitions
 * - Accessible with ARIA labels
 * - Fixed position (bottom-left)
 *
 * @returns {JSX.Element} Theme toggle button
 */
export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * Initialize theme from localStorage on component mount
   */
  useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    const prefersDark = storedTheme === "dark";

    if (prefersDark) {
      document.documentElement.classList.add(THEME_CLASS);
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove(THEME_CLASS);
      setIsDarkMode(false);
    }
  }, []);

  /**
   * Toggle theme between light and dark modes
   */
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove(THEME_CLASS);
      localStorage.setItem(STORAGE_KEYS.THEME, "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add(THEME_CLASS);
      localStorage.setItem(STORAGE_KEYS.THEME, "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed bottom-4 left-4 p-3 rounded-full transition-all duration-300",
        "bg-card shadow-lg hover:scale-110 active:scale-95",
        "border-2 border-primary/20 hover:border-primary/40",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      )}
      style={{ zIndex: Z_INDEX.THEME_TOGGLE }}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-primary" />
      ) : (
        <Moon className="h-5 w-5 text-primary" />
      )}
    </button>
  );
};
