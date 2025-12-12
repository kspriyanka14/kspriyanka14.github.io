import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * DarkSpaceBackground component - Animated starfield with shooting stars
 *
 * Features:
 * - Stable star generation (no repositioning on scroll/re-render)
 * - 450 stars in 3 depth layers (small, medium, large)
 * - Twinkling stars with varied delays
 * - 3 shooting stars that regenerate at random positions
 * - Smart resize handling (only regenerates on significant viewport changes)
 *
 * Technical Implementation:
 * - Uses useState initialization function for one-time star generation
 * - Shooting stars pre-generated in stable state (fixes "3-4 times same position" bug)
 * - onAnimationEnd regenerates individual shooting stars at new random positions
 * - Debounced resize handler prevents unnecessary regeneration
 *
 * Bug Fixes:
 * - Stars no longer reposition on scroll (mobile/desktop)
 * - Shooting stars randomize from 2nd appearance onwards
 * - No inline Math.random() in JSX (was causing render batching issues)
 *
 * @returns {JSX.Element} Dark space background with stars and shooting stars
 */
export const DarkSpaceBackground = () => {
  const viewportSizeRef = useRef({ width: 0, height: 0 });

  /**
   * Generate stars ONCE on component mount using useState initialization
   * Creates 3 depth layers: small (300), medium (100), large (50) = 450 total
   * This ensures stars maintain stable positions across re-renders
   */
  const [stars] = useState(() => {
    const newStars = [];

    // Helper function to generate a star layer
    const generateStarLayer = (
      count,
      sizeRange,
      opacityRange,
      category,
      twinkleChance
    ) => {
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: `${category}-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
          opacity:
            Math.random() * (opacityRange[1] - opacityRange[0]) +
            opacityRange[0],
          twinkle: Math.random() > twinkleChance,
          twinkleDelay: Math.random() * 5,
        });
      }
    };

    // Small stars (far away) - 300 stars
    generateStarLayer(300, [0.5, 1.5], [0.3, 0.8], 'small', 0.7);

    // Medium stars (mid-distance) - 100 stars
    generateStarLayer(100, [1, 2.5], [0.5, 0.9], 'medium', 0.5);

    // Large stars (closer, brighter) - 50 stars
    generateStarLayer(50, [1.5, 3.5], [0.7, 1.0], 'large', 0.3);

    return newStars;
  });

  /**
   * Generate shooting stars ONCE with stable random positions
   * Pre-generating prevents the "3-4 times same position" bug
   */
  const [shootingStars, setShootingStars] = useState(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      top: Math.random() * 50,
      left: Math.random() * 100,
      delay: i * 6 + Math.random() * 4,
      duration: Math.random() * 2 + 2,
    }))
  );

  /**
   * Regenerate a single shooting star at new random position
   * Called when shooting star animation completes
   */
  const regenerateShootingStar = useCallback((starId) => {
    setShootingStars((prevStars) =>
      prevStars.map((star) =>
        star.id === starId
          ? {
              ...star,
              top: Math.random() * 50,
              left: Math.random() * 100,
              delay: 0, // Start immediately after regeneration
              duration: Math.random() * 2 + 2,
            }
          : star
      )
    );
  }, []);

  /**
   * Smart resize handler - only regenerate on significant viewport changes
   * This prevents unnecessary regeneration on mobile browser chrome hiding/showing
   */
  useEffect(() => {
    // Initialize viewport size reference
    viewportSizeRef.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let resizeTimeout;

    const handleResize = () => {
      // Debounce resize events (wait 150ms after last resize)
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        const currentWidth = window.innerWidth;
        const currentHeight = window.innerHeight;
        const previousWidth = viewportSizeRef.current.width;
        const previousHeight = viewportSizeRef.current.height;

        // Calculate percentage change
        const widthChange =
          Math.abs(currentWidth - previousWidth) / previousWidth;
        const heightChange =
          Math.abs(currentHeight - previousHeight) / previousHeight;

        // Only trigger on changes greater than 10%
        // This filters out mobile browser chrome changes (typically <5%)
        if (widthChange > 0.1 || heightChange > 0.1) {
          viewportSizeRef.current = {
            width: currentWidth,
            height: currentHeight,
          };
          // Note: We're not regenerating stars anymore since they're in stable state
          // If you need to regenerate on significant resize, convert stars to state setter
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Pitch black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Stars - 450 total in 3 depth layers */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={star.twinkle ? 'animate-twinkle' : ''}
          style={{
            position: 'absolute',
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${
              star.opacity * 0.8
            })`,
            animationDelay: star.twinkle ? `${star.twinkleDelay}s` : '0s',
          }}
        />
      ))}

      {/* Shooting stars - Pre-generated with stable positions */}
      <div className="shooting-stars">
        {shootingStars.map((star) => (
          <div
            key={`meteor-${star.id}`}
            className="shooting-star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
            onAnimationEnd={() => regenerateShootingStar(star.id)}
          />
        ))}
      </div>
    </div>
  );
};
