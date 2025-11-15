import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { STORAGE_KEYS, THEME_CLASS, Z_INDEX } from "@/data/constants";

/**
 * ThemeToggle component - Fixed button to toggle between light and dark themes
 *
 * Features:
 * - Detects system preference (prefers-color-scheme)
 * - Persists user's explicit choice to localStorage
 * - Defaults to dark theme if no preference set
 * - Updates Safari mobile status bar color (Dynamic Island support)
 * - Listens for system theme changes
 * - Smooth icon transitions
 * - Accessible with ARIA labels
 * - Fixed position (bottom-left)
 *
 * Theme Priority:
 * 1. localStorage (user's explicit choice)
 * 2. System preference (prefers-color-scheme)
 * 3. Dark theme (default)
 *
 * @returns {JSX.Element} Theme toggle button
 */
export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Safari mobile theme colors (hex for better compatibility)
  const LIGHT_THEME_COLOR = "#f0f6fa"; // Light sky blue
  const DARK_THEME_COLOR = "#0d0d12"; // Deep space (not pure black - Safari rejects #000)

  /**
   * Update Safari mobile theme-color meta tag for Dynamic Island/notch
   */
  const updateThemeColor = (isDark) => {
    // Update or create theme-color meta tag without media query
    let themeColorMeta = document.querySelector(
      'meta[name="theme-color"]:not([media])'
    );
    if (!themeColorMeta) {
      themeColorMeta = document.createElement("meta");
      themeColorMeta.name = "theme-color";
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.content = isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
  };

  /**
   * Initialize theme from DOM (already set by inline script in index.html)
   * and listen for system preference changes
   */
  useEffect(() => {
    // Read initial theme from DOM (set by inline script)
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains(THEME_CLASS);
      setIsDarkMode(isDark);
      updateThemeColor(isDark);
    };

    checkTheme();

    // Listen for system theme preference changes
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleSystemThemeChange = (e) => {
      // Only update if user hasn't explicitly set a preference
      const hasExplicitPreference = localStorage.getItem(STORAGE_KEYS.THEME);

      if (!hasExplicitPreference) {
        const shouldBeDark = e.matches;

        // Update DOM class
        if (shouldBeDark) {
          document.documentElement.classList.add(THEME_CLASS);
        } else {
          document.documentElement.classList.remove(THEME_CLASS);
        }

        // Update html background color for Safari to sample
        document.documentElement.style.backgroundColor = shouldBeDark
          ? DARK_THEME_COLOR
          : LIGHT_THEME_COLOR;

        setIsDarkMode(shouldBeDark);
        updateThemeColor(shouldBeDark);
      }
    };

    // Add listener for system preference changes (modern browsers)
    if (darkModeMediaQuery.addEventListener) {
      darkModeMediaQuery.addEventListener("change", handleSystemThemeChange);
    } else if (darkModeMediaQuery.addListener) {
      // Fallback for older browsers
      darkModeMediaQuery.addListener(handleSystemThemeChange);
    }

    // Cleanup
    return () => {
      if (darkModeMediaQuery.removeEventListener) {
        darkModeMediaQuery.removeEventListener(
          "change",
          handleSystemThemeChange
        );
      } else if (darkModeMediaQuery.removeListener) {
        darkModeMediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  /**
   * Toggle theme between light and dark modes
   * Updates DOM, localStorage, Safari mobile theme color, and html background
   */
  const toggleTheme = () => {
    const newIsDark = !isDarkMode;

    // Update DOM class
    if (newIsDark) {
      document.documentElement.classList.add(THEME_CLASS);
    } else {
      document.documentElement.classList.remove(THEME_CLASS);
    }

    // Update html background color immediately (for Safari to sample)
    document.documentElement.style.backgroundColor = newIsDark
      ? DARK_THEME_COLOR
      : LIGHT_THEME_COLOR;

    // Save user's explicit choice
    localStorage.setItem(STORAGE_KEYS.THEME, newIsDark ? "dark" : "light");

    // Update Safari mobile theme color meta tag
    updateThemeColor(newIsDark);

    // Update state
    setIsDarkMode(newIsDark);
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
