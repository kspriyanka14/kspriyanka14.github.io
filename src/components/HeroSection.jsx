import { ArrowDown } from "lucide-react";
import { ProgressiveImage } from "@/components/ProgressiveImage";
import { personalInfo } from "@/data/navigation";

/**
 * HeroSection component - Home section with profile image and introduction
 *
 * Features:
 * - Desktop: Image on left | Content (name, story, CTAs) on right
 * - Mobile: Image on top → Content below
 * - Equal padding on left and right edges (centered layout)
 * - Left-aligned text for better readability
 * - 2 CTA buttons (View My Work, Contact Me)
 * - Visible scroll arrow indicator (desktop only)
 *
 * @returns {JSX.Element} Home section with proper centering
 */
export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center py-20 sm:py-16 md:py-20 z-10"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(24rem,auto)_1fr] gap-8 md:gap-12 lg:gap-16 items-center lg:items-stretch">
          {/* LEFT - Profile Image */}
          <div className="flex justify-center lg:justify-start lg:items-stretch opacity-0 animate-fade-in">
            {/* Mobile: Smaller image */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:hidden rounded-lg shadow-[0_0_40px_hsl(var(--primary)_/_0.6),0_0_80px_hsl(var(--primary)_/_0.3)]">
              <ProgressiveImage
                imageName="profile"
                folder="profile"
                alt="Priyanka Kavali Subramanyam"
                className="rounded-lg w-full h-full object-cover"
                aspectRatio="1/1"
              />
            </div>
            {/* Desktop: Full height image matching content */}
            <div className="hidden lg:block lg:w-[24rem] lg:h-full rounded-lg shadow-[0_0_40px_hsl(var(--primary)_/_0.6),0_0_80px_hsl(var(--primary)_/_0.3)]">
              <ProgressiveImage
                imageName="profile"
                folder="profile"
                alt="Priyanka Kavali Subramanyam"
                className="rounded-lg w-full h-full object-cover"
                aspectRatio="1/1"
              />
            </div>
          </div>

          {/* RIGHT - Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left flex flex-col justify-between">
            {/* Full Name - Single line with fluid responsive sizing */}
            <h1
              className="font-bold leading-tight xl:whitespace-nowrap"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 3rem)" }}
            >
              <span className="text-foreground/90 opacity-0 animate-fade-in-delay-1 inline-block">
                Hi, I'm
              </span>{" "}
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

      {/* Scroll indicator - Enhanced visibility (hidden on mobile) */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center animate-bounce z-20">
        <span className="text-sm font-medium text-foreground/90 mb-2 backdrop-blur-sm bg-background/50 px-3 py-1 rounded-full">
          Scroll
        </span>
        <ArrowDown className="h-6 w-6 text-primary drop-shadow-lg" />
      </div>
    </section>
  );
};
