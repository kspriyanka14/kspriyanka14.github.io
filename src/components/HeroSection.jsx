import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { ProgressiveImage } from '@/components/ProgressiveImage';
import { SkillMarquee } from '@/components/SkillMarquee';
import { personalInfo } from '@/data/navigation';
import { skillsWithLogos } from '@/data/skills';

/**
 * HeroSection component - Home section with profile image, introduction, and skills
 *
 * Features:
 * - Desktop: Image on left | Content (name, story, CTAs) on right
 * - Mobile: Image on top → Content below
 * - Profile image hover: Reveals "Digital Artwork - Crafted in Procreate" overlay
 * - Image zoom effect on hover with smooth transition
 * - Equal padding on left and right edges (centered layout)
 * - Left-aligned text for better readability
 * - 2 CTA buttons (View My Work, Contact Me)
 * - Rolling skills marquee at bottom
 * - Moon (dark mode) / Sun (light mode) appears on hover in top-right
 *
 * @returns {JSX.Element} Home section with proper centering
 */
export const HeroSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Split skills into 2 rows for cleaner look
  const row1 = skillsWithLogos.slice(0, 13);
  const row2 = skillsWithLogos.slice(13);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center py-12 sm:py-16 md:py-20 z-10"
    >
      {/* Moon/Sun hover zone - only in home section */}
      <div className="group absolute top-8 right-4 sm:top-12 sm:right-8 md:top-16 md:right-12 w-32 h-32 sm:w-40 sm:h-40 pointer-events-auto cursor-default z-20">
        {isDarkMode ? (
          /* Moon - appears on hover in dark mode */
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-75 group-hover:scale-100 pointer-events-none">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-yellow-100/30 rounded-full scale-150" />
              <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                className="relative drop-shadow-[0_0_20px_rgba(255,255,200,0.5)]"
              >
                <defs>
                  <radialGradient id="moonGradient" cx="30%" cy="30%">
                    <stop offset="0%" stopColor="#FFFEF0" />
                    <stop offset="100%" stopColor="#E8E4D4" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#moonGradient)" />
                <circle cx="35" cy="40" r="8" fill="#D4D0C0" opacity="0.4" />
                <circle cx="60" cy="55" r="6" fill="#D4D0C0" opacity="0.3" />
                <circle cx="45" cy="65" r="5" fill="#D4D0C0" opacity="0.35" />
                <circle cx="65" cy="35" r="4" fill="#D4D0C0" opacity="0.25" />
              </svg>
            </div>
          </div>
        ) : (
          /* Sun - appears on hover in light mode */
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-75 group-hover:scale-100 pointer-events-none">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-yellow-300/40 rounded-full scale-[2]" />
              <div className="absolute inset-0 blur-xl bg-orange-300/50 rounded-full scale-125" />
              <svg
                width="90"
                height="90"
                viewBox="0 0 100 100"
                className="relative drop-shadow-[0_0_25px_rgba(255,200,50,0.8)] animate-spin-slow"
              >
                <defs>
                  <radialGradient id="sunGradient" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#FFF5B8" />
                    <stop offset="50%" stopColor="#FFD93D" />
                    <stop offset="100%" stopColor="#FF9500" />
                  </radialGradient>
                </defs>
                {[...Array(12)].map((_, i) => (
                  <polygon
                    key={i}
                    points="50,8 47,22 53,22"
                    fill="#FFD93D"
                    opacity="0.9"
                    transform={`rotate(${i * 30} 50 50)`}
                  />
                ))}
                <circle cx="50" cy="50" r="28" fill="url(#sunGradient)" />
                <circle cx="44" cy="44" r="10" fill="#FFFEF0" opacity="0.4" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Centered content wrapper - contains everything */}
      <div className="w-full">
        {/* Main content container */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(24rem,auto)_1fr] gap-8 md:gap-12 lg:gap-16 items-center lg:items-stretch w-full">
            {/* LEFT - Profile Image */}
            <div className="flex justify-center lg:justify-start lg:items-stretch opacity-0 animate-fade-in">
              {/* Mobile: Smaller image */}
              <div className="group relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:hidden rounded-lg shadow-[0_0_40px_hsl(var(--primary)_/_0.6),0_0_80px_hsl(var(--primary)_/_0.3)] overflow-hidden cursor-pointer">
                <ProgressiveImage
                  imageName="profile"
                  folder="profile"
                  alt="Priyanka Kavali Subramanyam - Digital Art"
                  className="rounded-lg w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  aspectRatio="1/1"
                />
                {/* Creative hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-4 sm:pb-6 rounded-lg">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 text-center px-3">
                    <Sparkles className="w-5 h-5 text-primary mx-auto mb-2 animate-pulse" />
                    <p className="text-white font-medium text-xs sm:text-sm">
                      Hand-drawn with love in Procreate
                    </p>
                  </div>
                </div>
              </div>
              {/* Desktop: Full height image matching content */}
              <div className="group relative hidden lg:block lg:w-[24rem] lg:h-full rounded-lg shadow-[0_0_40px_hsl(var(--primary)_/_0.6),0_0_80px_hsl(var(--primary)_/_0.3)] overflow-hidden cursor-pointer">
                <ProgressiveImage
                  imageName="profile"
                  folder="profile"
                  alt="Priyanka Kavali Subramanyam - Digital Art"
                  className="rounded-lg w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  aspectRatio="1/1"
                />
                {/* Creative hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-6 rounded-lg">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 text-center px-4">
                    <Sparkles className="w-6 h-6 text-primary mx-auto mb-2 animate-pulse" />
                    <p className="text-white font-medium text-sm">
                      Hand-drawn with love in Procreate
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT - Content */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left flex flex-col justify-between">
              {/* Full Name - Single line with fluid responsive sizing */}
              <h1
                className="font-bold leading-tight xl:whitespace-nowrap"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 3rem)' }}
              >
                <span className="text-foreground/90 opacity-0 animate-fade-in-delay-1 inline-block">
                  Hi, I'm
                </span>{' '}
                <span className="text-primary opacity-0 animate-fade-in-delay-2 inline-block">
                  Priyanka Kavali Subramanyam
                </span>
              </h1>

              {/* Story - Starting with "I'm a full-stack developer..." */}
              <div className="space-y-4 text-foreground/90 font-medium leading-relaxed text-sm sm:text-base md:text-lg text-left max-w-3xl mx-auto lg:mx-0">
                <p className="opacity-0 animate-fade-in-delay-3">
                  {personalInfo.about.intro}
                </p>
                <p className="opacity-0 animate-fade-in-delay-4">
                  {personalInfo.about.approach}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-stretch pt-4 opacity-0 animate-fade-in-delay-5">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)_/_0.7)] hover:scale-105 text-center"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-background hover:shadow-[0_0_30px_hsl(var(--primary)_/_0.7)] transition-all duration-300 font-medium text-center hover:scale-105"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Marquee - Full width, directly below buttons */}
        <div className="w-full mt-10 sm:mt-12 md:mt-14 lg:mt-16 space-y-2 sm:space-y-3 opacity-0 animate-fade-in-delay-6">
          <SkillMarquee skills={row1} direction="left" speed={40} />
          <SkillMarquee skills={row2} direction="right" speed={40} />
        </div>
      </div>
    </section>
  );
};
