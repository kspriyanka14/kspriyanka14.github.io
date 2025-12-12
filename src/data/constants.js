/**
 * Application-wide constants for configuration
 */

/**
 * Z-index layer constants for consistent stacking order
 */
export const Z_INDEX = {
  BACKGROUND: 0,
  CONTENT: 1,
  THEME_TOGGLE: 50,
  SCROLL_TO_TOP: 50,
  MODAL: 1000,
  TOAST: 2000,
};

/**
 * Project filter categories
 */
export const PROJECT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'design', label: 'Design' },
  { id: 'desktop', label: 'Desktop Apps' },
  { id: 'devops', label: 'DevOps/Cloud' },
];

/**
 * Image format fallback order
 */
export const IMAGE_FORMATS = ['avif', 'webp', 'jpg'];

/**
 * Placeholder image path
 */
export const PLACEHOLDER_IMAGE = '/images/projects/placeholder.jpg';

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  THEME: 'theme',
};

/**
 * Theme class name
 */
export const THEME_CLASS = 'dark';
