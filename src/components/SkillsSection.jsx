import { skillsData } from "@/data/skills";
import { useEffect, useRef, useState } from "react";

/**
 * SkillsSection component - Beautiful grid-based skills display with categories
 *
 * Features:
 * - Organized by 8 categories (Languages, Frontend, Backend, Databases, Design, Dev Tools, DevOps, Testing)
 * - Individual skill pills with shadows and hover effects
 * - Icon-based category headers
 * - Fully responsive grid layout
 * - Clean, modern design with proper spacing
 * - Skills data separated in /src/data/skills.js for easy updates
 * - Scroll-triggered sequential animations (one card at a time)
 *
 * @returns {JSX.Element} Skills section with beautified card layout
 */
export const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [isVisible]);

  // Animation delay calculation: title first, then each card with 0.15s intervals
  const getAnimationDelay = (index) => {
    const baseDelay = 0.1; // Title appears at 0.1s
    const cardDelay = 0.15; // Each card 0.15s apart
    return `${baseDelay + (index + 1) * cardDelay}s`;
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 relative bg-secondary/10 z-10"
    >
      <div className="container mx-auto max-w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center transition-opacity duration-600 ${
            isVisible ? "opacity-100 animate-fade-in" : "opacity-0"
          }`}
        >
          My <span className="text-primary">Skills</span>
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {skillsData.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group bg-card p-5 sm:p-6 md:p-7 rounded-xl shadow-lg border-2 border-primary/20 opacity-0 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)_/_0.5)] hover:scale-[1.03] relative overflow-hidden before:absolute before:top-0 before:bottom-0 before:w-[50%] before:-left-full before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/20 before:to-transparent before:skew-x-[-20deg] hover:before:animate-shine"
                style={
                  isVisible
                    ? {
                        animation: `fadeIn 0.6s ease-out ${getAnimationDelay(
                          index
                        )} forwards`,
                      }
                    : {}
                }
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0 shadow-sm transition-all duration-300 group-hover:bg-primary group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.6)]">
                    <IconComponent className="h-6 w-6 text-primary transition-all duration-300 group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-foreground/90">
                    {category.title}
                  </h3>
                </div>

                {/* Skills pills */}
                <div className="flex flex-wrap gap-2.5 relative z-10">
                  {category.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-foreground/90 border border-primary/20 shadow-sm hover:shadow-[0_0_15px_hsl(var(--primary)_/_0.6)] hover:scale-105 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
