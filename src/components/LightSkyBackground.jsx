import { useCallback, useEffect, useRef, useState } from "react";

/**
 * LightSkyBackground component - Animated sky with continuous drifting clouds
 *
 * Features:
 * - Stable cloud generation (no flickering on scroll/re-render)
 * - Staggered cloud positions for continuous coverage (NO EMPTY SKY)
 * - 12 clouds total (4 on-screen, 4 entering, 4 queued) for seamless animation
 * - Smart resize handling (only regenerates on significant viewport changes)
 * - Varied sizes, speeds, and opacities for natural feel
 *
 * Behavior:
 * - FIRST LOAD - 3 Groups for Continuous Coverage:
 *   - Group 1 (4 clouds): On-screen (0-100%) - visible immediately
 *   - Group 2 (4 clouds): Just off-screen left (-30% to -10%) - entering soon
 *   - Group 3 (4 clouds): Further left (-60% to -35%) - queued
 * - CONTINUOUS FLOW:
 *   - When a cloud exits right, it immediately regenerates close to left edge (-35% to -45%)
 *   - Enters screen quickly - NO LAG between exit and entrance
 *   - Varied durations (35s-55s + stagger) prevent simultaneous exits
 *   - Always clouds visible - never empty sky
 *
 * Technical Implementation:
 * - Uses useState initialization with 3-group staggering system
 * - onAnimationEnd triggers individual cloud regeneration (no mass exits)
 * - animKey increment forces React remount for clean animation restart
 * - Regenerated clouds positioned close to screen edge for fast entrance
 * - CSS animation runs once (forwards), then cloud regenerates
 *
 * @returns {JSX.Element} Light sky background with continuous animated clouds
 */
export const LightSkyBackground = () => {
  const viewportSizeRef = useRef({ width: 0, height: 0 });

  /**
   * Generate clouds with staggered starting positions for continuous coverage
   * Mix of on-screen clouds (immediate) and off-screen clouds (entering soon)
   */
  const [clouds, setClouds] = useState(() => {
    const numberOfClouds = 12; // Increased for better coverage

    return Array.from({ length: numberOfClouds }, (_, i) => {
      // Stagger clouds: some on-screen, some off-screen left, with varied delays
      const staggerGroup = i % 3;
      let x, delay;

      if (staggerGroup === 0) {
        // Group 1: Visible on screen (0% to 100%)
        x = Math.random() * 100;
        delay = 0;
      } else if (staggerGroup === 1) {
        // Group 2: Just off-screen left, entering soon (-30% to -10%)
        x = -30 + Math.random() * 20;
        delay = 0;
      } else {
        // Group 3: Further left, entering later (-60% to -35%)
        x = -60 + Math.random() * 25;
        delay = 0;
      }

      return {
        id: i,
        x,
        // Vertical position: 5% to 65% from top
        y: Math.random() * 60 + 5,
        // Size variation: 100px to 180px width
        size: Math.random() * 80 + 100,
        // Opacity variation: 0.5 to 0.8
        opacity: Math.random() * 0.3 + 0.5,
        // Varied durations: 35s to 55s (ensure different exit times)
        duration: 35 + Math.random() * 20 + i * 2, // Stagger by id as well
        delay,
        // Animation key - changes to force animation restart
        animKey: 0,
      };
    });
  });

  /**
   * Regenerate a cloud at left edge when it completes its animation
   * New clouds emerge from off-screen left IMMEDIATELY (no gap in coverage)
   */
  const regenerateCloud = useCallback((cloudId) => {
    setClouds((prevClouds) =>
      prevClouds.map((cloud) =>
        cloud.id === cloudId
          ? {
              ...cloud,
              // NEW CLOUDS: Start just off-screen left (-35% to -45%)
              // Close to screen edge for quick entrance
              x: -35 - Math.random() * 10,
              // New random vertical position
              y: Math.random() * 60 + 5,
              // New random size
              size: Math.random() * 80 + 100,
              // New random opacity
              opacity: Math.random() * 0.3 + 0.5,
              // Varied duration: 35s to 55s
              duration: 35 + Math.random() * 20,
              // Start immediately after regeneration - no delay
              delay: 0,
              // Increment animation key to force React to restart animation
              animKey: cloud.animKey + 1,
            }
          : cloud
      )
    );
  }, []);

  /**
   * Smart resize handler - only regenerate clouds if viewport size changes significantly
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

        // Only regenerate if width OR height changed by more than 10%
        // This filters out mobile browser chrome changes (typically <5%)
        if (widthChange > 0.1 || heightChange > 0.1) {
          viewportSizeRef.current = {
            width: currentWidth,
            height: currentHeight,
          };
          // Note: We're not regenerating clouds anymore since they're in stable state
          // If you need to regenerate on significant resize, convert clouds to state setter
        }
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              #87CEEB 0%,
              #B0D9F1 40%,
              #D4E8F5 100%
            )
          `,
        }}
      />

      {/* Clouds */}
      {clouds.map((cloud) => (
        <div
          key={`cloud-${cloud.id}-${cloud.animKey}`}
          className="animate-cloud-drift"
          style={{
            position: "absolute",
            top: `${cloud.y}%`,
            left: `${cloud.x}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          }}
          onAnimationEnd={() => regenerateCloud(cloud.id)}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 120"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: cloud.opacity }}
          >
            <ellipse cx="60" cy="80" rx="50" ry="40" fill="white" />
            <ellipse cx="100" cy="70" rx="60" ry="45" fill="white" />
            <ellipse cx="140" cy="80" rx="50" ry="40" fill="white" />
            <ellipse cx="90" cy="50" rx="45" ry="35" fill="white" />
          </svg>
        </div>
      ))}
    </div>
  );
};
