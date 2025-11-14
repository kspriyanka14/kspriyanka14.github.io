/**
 * Application-wide constants for animations, breakpoints, and configuration
 */

/**
 * Animation duration constants (in seconds)
 */
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  BACKGROUND_FLOAT: 3,
  BACKGROUND_PULSE: 2,
  CLOUD_DRIFT: 60,
  SHOOTING_STAR: 3,
  TWINKLE: 3,
};

/**
 * Z-index layer constants for consistent stacking order
 */
export const Z_INDEX = {
  BACKGROUND: 0,
  CONTENT: 1,
  NAVBAR: 100,
  THEME_TOGGLE: 50,
  SCROLL_TO_TOP: 50,
  MODAL: 1000,
  TOAST: 2000,
};

/**
 * Responsive breakpoint constants (in pixels)
 * Matches Tailwind CSS default breakpoints
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
};

/**
 * Background element count constants
 */
export const BACKGROUND_CONFIG = {
  DARK_STARS_TOTAL: 450,
  DARK_SHOOTING_STARS: 3,
  LIGHT_CLOUDS: 8,
  NAVBAR_SCROLL_THRESHOLD: 10,
};

/**
 * Project filter categories
 */
export const PROJECT_FILTERS = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "ai", label: "AI/ML" },
  { id: "design", label: "Design" },
  { id: "desktop", label: "Desktop Apps" },
  { id: "devops", label: "DevOps/Cloud" },
];

/**
 * Image format fallback order
 */
export const IMAGE_FORMATS = ["avif", "webp", "jpg"];

/**
 * Placeholder image path
 */
export const PLACEHOLDER_IMAGE = "/images/projects/placeholder.jpg";

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  THEME: "theme",
};

/**
 * Theme class name
 */
export const THEME_CLASS = "dark";

/**
 * Section IDs for smooth scrolling
 */
export const SECTION_IDS = {
  HOME: "home",
  ABOUT: "about",
  SKILLS: "skills",
  PROJECTS: "projects",
  CONTACT: "contact",
};
