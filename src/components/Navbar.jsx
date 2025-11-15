import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { BACKGROUND_CONFIG } from "@/data/constants";

/**
 * Navbar component - Fixed navigation bar with active section highlighting
 *
 * Features:
 * - Sticky navigation with scroll detection
 * - Active section highlighting based on scroll position
 * - Smooth color transitions for active links
 * - Mobile responsive hamburger menu with enhanced UX
 * - Click outside to close mobile menu
 * - Escape key to close mobile menu
 * - Instant menu display (no lag animations)
 * - Body scroll lock when mobile menu is open
 *
 * @returns {JSX.Element} Navigation bar component
 */
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  /**
   * Handle scroll events to update navbar background and active section
   */
  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state for navbar styling
      setIsScrolled(window.scrollY > BACKGROUND_CONFIG.NAVBAR_SCROLL_THRESHOLD);

      // Determine active section based on scroll position
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    handleScroll(); // Run once on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Prevent body scroll when mobile menu is open
   */
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }, [isMenuOpen]);

  /**
   * Close mobile menu when Escape key is pressed
   */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  /**
   * Close mobile menu when clicking outside
   */
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e) => {
      // Don't close if clicking the toggle button
      if (toggleButtonRef.current?.contains(e.target)) return;

      // Close if clicking outside the menu content
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    // Small delay to prevent immediate closure on open
    const timeoutId = setTimeout(() => {
      window.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  /**
   * Close mobile menu when a link is clicked
   */
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed w-full top-0 z-[100] transition-all duration-300",
          isScrolled
            ? "py-3 bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
            : "py-5 bg-background/80 backdrop-blur-sm"
        )}
      >
        <div className="container flex items-center justify-between px-4">
          {/* Logo */}
          <a
            className="text-lg md:text-xl font-bold flex items-center hover:scale-105 transition-transform"
            href="#home"
            onClick={handleNavClick}
          >
            <span className="relative z-10">
              <span className="text-primary">Priyanka</span>
              <span className="text-foreground"> K S</span>
            </span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  "text-sm lg:text-base font-medium transition-colors duration-300",
                  activeSection === item.id
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            ref={toggleButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
            className="md:hidden p-2 text-foreground z-[110] relative hover:bg-primary/10 rounded-lg transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[105] md:hidden">
          {/* Clickable overlay background */}
          <div className="absolute inset-0 bg-background/98 backdrop-blur-lg" />

          {/* Menu content */}
          <div
            ref={menuRef}
            className="relative h-full flex flex-col items-center justify-center"
          >
            <div className="flex flex-col space-y-8 text-xl">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "font-medium transition-colors duration-300",
                    activeSection === item.id
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  )}
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
