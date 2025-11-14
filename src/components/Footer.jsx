import { ArrowUp } from "lucide-react";

/**
 * Footer component - Site footer with copyright and scroll-to-top button
 *
 * Features:
 * - Dynamic copyright year
 * - Fixed scroll-to-top button (bottom-right)
 * - Smooth hover animations
 *
 * @returns {JSX.Element} Footer component
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 text-center text-sm text-muted-foreground relative z-10">
      &copy; {currentYear} Priyanka Kavali Subramanyam. All rights reserved.
      {/* Scroll to top button */}
      <a
        href="#home"
        className="p-2 rounded-full fixed bottom-4 right-4 bg-card shadow-lg hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-primary/20 hover:border-primary/40"
        aria-label="Scroll to top"
      >
        <ArrowUp />
      </a>
    </footer>
  );
};
