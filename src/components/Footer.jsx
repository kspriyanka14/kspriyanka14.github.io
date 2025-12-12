import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Footer component - Site footer with copyright and scroll-to-top button
 *
 * Features:
 * - Dynamic copyright year
 * - Smart scroll-to-top button (shows only after scrolling past home section)
 * - Fade-in/fade-out animation
 * - Smooth hover animations
 *
 * @returns {JSX.Element} Footer component
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollButton, setShowScrollButton] = useState(false);

  /**
   * Track scroll position and show button only after scrolling past home section
   */
  useEffect(() => {
    const handleScroll = () => {
      // Show button only after scrolling past 80% of viewport height (past home section)
      const scrollThreshold = window.innerHeight * 0.8;
      const scrolled = window.scrollY > scrollThreshold;
      setShowScrollButton(scrolled);
    };

    // Check on mount
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="py-6 text-center text-sm text-muted-foreground relative z-10">
      &copy; {currentYear} Priyanka Kavali Subramanyam. All rights reserved.
      {/* Scroll to top button - Only visible after scrolling past home section */}
      <a
        href="#home"
        className={`
          p-2 rounded-full fixed bottom-4 right-4 bg-card shadow-lg
          hover:bg-primary/20 text-primary transition-all duration-300
          hover:scale-110 active:scale-95 border-2 border-primary/20
          hover:border-primary/40 pointer-events-auto
          ${
            showScrollButton
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }
        `}
        aria-label="Scroll to top"
        aria-hidden={!showScrollButton}
      >
        <ArrowUp />
      </a>
    </footer>
  );
};
