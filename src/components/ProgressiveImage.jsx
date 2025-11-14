import { useState, useEffect } from "react";
import { PLACEHOLDER_IMAGE, IMAGE_FORMATS } from "@/data/constants";

/**
 * ProgressiveImage component with fallback support for AVIF → WebP → JPEG → Placeholder
 * Supports theme-aware images (light/dark mode) via imageNameLight and imageNameDark props
 *
 * @param {Object} props - Component props
 * @param {string} props.imageName - Base name of the image without extension (e.g., "portfolio")
 * @param {string} [props.imageNameLight] - Optional light mode specific image name
 * @param {string} [props.imageNameDark] - Optional dark mode specific image name
 * @param {string} props.folder - Folder path relative to /images/ (e.g., "projects/portfolio")
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.aspectRatio="16/9"] - CSS aspect ratio value
 * @returns {JSX.Element} Picture element with progressive image loading
 *
 * @example
 * <ProgressiveImage
 *   imageName="portfolio"
 *   imageNameLight="portfolio-light"
 *   imageNameDark="portfolio-dark"
 *   folder="projects/portfolio"
 *   alt="Portfolio website screenshot"
 *   className="rounded-lg"
 *   aspectRatio="16/9"
 * />
 */
export const ProgressiveImage = ({
  imageName,
  imageNameLight,
  imageNameDark,
  folder,
  alt,
  className = "",
  aspectRatio = "16/9",
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Initial check
    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Determine which image to use based on theme
  const getImageName = () => {
    if (imageNameLight && imageNameDark) {
      return isDarkMode ? imageNameDark : imageNameLight;
    }
    return imageName;
  };

  const currentImageName = getImageName();

  // Construct paths for each image format
  const basePath = `/images/${folder}`;
  const avifSrc = `${basePath}/${currentImageName}.avif`;
  const webpSrc = `${basePath}/${currentImageName}.webp`;
  const jpgSrc = `${basePath}/${currentImageName}.jpg`;

  /**
   * Handle image load error by falling back to placeholder
   */
  const handleError = () => {
    setImageError(true);
  };

  /**
   * Handle successful image load
   */
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Use placeholder if image failed to load or no imageName provided
  const shouldUsePlaceholder = imageError || !imageName;

  return (
    <div
      className={`relative overflow-hidden bg-card ${className}`}
      style={{ aspectRatio }}
    >
      {!shouldUsePlaceholder ? (
        <picture>
          {/* AVIF format - best compression */}
          <source srcSet={avifSrc} type="image/avif" />

          {/* WebP format - fallback with good compression */}
          <source srcSet={webpSrc} type="image/webp" />

          {/* JPEG format - universal fallback */}
          <img
            src={jpgSrc}
            alt={alt}
            loading="lazy"
            onError={handleError}
            onLoad={handleLoad}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </picture>
      ) : (
        <img
          src={PLACEHOLDER_IMAGE}
          alt="Project image coming soon"
          className="h-full w-full object-cover opacity-50"
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && !shouldUsePlaceholder && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}
    </div>
  );
};
