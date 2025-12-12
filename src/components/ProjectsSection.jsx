import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ExternalLink,
  Github,
  Play,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { ProgressiveImage } from '@/components/ProgressiveImage';
import { PROJECT_FILTERS } from '@/data/constants';
import projectsData from '@/data/projects.json';
import { cn } from '@/lib/utils';

/**
 * ProjectCard component - Displays a single project with image, description, and links
 *
 * Features:
 * - Flip animation on hover (desktop) or click/tap (mobile)
 * - Image on front, description on back
 * - Title, tech stack, and links stay in place
 *
 * @param {Object} props - Component props
 * @param {Object} props.project - Project data object
 * @returns {JSX.Element} Project card component
 */
const ProjectCard = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const maxTechStack = 10;
  const displayedTechStack = project.techStack.slice(0, maxTechStack);

  const handleFlipToggle = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="group bg-card rounded-lg shadow-md border-2 border-primary/20 overflow-hidden flex flex-col transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)_/_0.5)] hover:scale-105 relative before:absolute before:top-0 before:bottom-0 before:w-[50%] before:-left-full before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/20 before:to-transparent before:skew-x-[-20deg] before:z-10 hover:before:animate-shine w-full max-w-sm">
      {/* Flip container for image/description */}
      <div
        className="relative w-full cursor-pointer border-b-2 border-primary/20"
        style={{ aspectRatio: '16/9', perspective: '1000px' }}
        onClick={handleFlipToggle}
      >
        <div
          className={`absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d] ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          } md:group-hover:[transform:rotateY(180deg)]`}
        >
          {/* Front - Project image */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <ProgressiveImage
              imageName={project.imageName}
              imageNameLight={project.imageNameLight}
              imageNameDark={project.imageNameDark}
              folder={`projects/${project.id}`}
              alt={`${project.name} screenshot`}
              className="w-full h-full object-cover"
              aspectRatio="16/9"
            />
          </div>

          {/* Back - Project description */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-primary/10 flex items-center justify-center p-4 sm:p-6">
            <p className="text-foreground/90 font-medium text-xs sm:text-sm leading-relaxed text-left overflow-y-auto max-h-full">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Project content - stays in place */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        {/* Title - stays at top */}
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground/90 text-center">
          {project.name}
        </h3>

        {/* Tech stack tags - centered horizontally and vertically */}
        {displayedTechStack.length > 0 && (
          <div className="flex-grow flex items-center justify-center mb-3 sm:mb-4">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
              {displayedTechStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:shadow-[0_0_15px_hsl(var(--primary)_/_0.6)] hover:scale-105 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Project links - stays at bottom */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border">
          {/* GitHub link (always shown) */}
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1 text-xs rounded-lg font-medium text-foreground/90 border border-border/50 bg-card/50 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.5)] hover:!text-primary hover:scale-105 active:scale-95"
            aria-label={`View ${project.name} code`}
          >
            <Github className="h-3.5 w-3.5" />
            <span>Code</span>
          </a>

          {/* Live demo link (optional) */}
          {project.liveDemoLink && (
            <a
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2 py-1 text-xs rounded-lg font-medium text-foreground/90 border border-border/50 bg-card/50 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.5)] hover:!text-primary hover:scale-105 active:scale-95"
              aria-label={`View ${project.name} live demo`}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Demo</span>
            </a>
          )}

          {/* Video demo link (optional) */}
          {project.videoLink && (
            <a
              href={project.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2 py-1 text-xs rounded-lg font-medium text-foreground/90 border border-border/50 bg-card/50 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.5)] hover:!text-primary hover:scale-105 active:scale-95"
              aria-label={`Watch ${project.name} video demo`}
            >
              <Play className="h-3.5 w-3.5" />
              <span>Video</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * ProjectsSection component - Single carousel section with filter tabs
 *
 * Features:
 * - Single unified projects section
 * - Carousel showing 3 cards (desktop), 2 (tablet), 1 (mobile)
 * - Featured projects sorted first
 * - Filter tabs for categories
 * - Navigation arrows and dot indicators
 *
 * @returns {JSX.Element} Projects section with carousel
 */
export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Embla carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Re-init carousel when filter changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      setScrollSnaps(emblaApi.scrollSnapList());
    }
  }, [emblaApi, activeFilter]);

  // Intersection observer for section visibility
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

  // Sort and filter projects - featured first
  const sortedProjects = [...projectsData].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const filterProjects = (projects) => {
    if (activeFilter === 'all') return projects;
    return projects.filter((project) => project.tags.includes(activeFilter));
  };

  const filteredProjects = filterProjects(sortedProjects);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 relative z-10"
    >
      <div className="container mx-auto max-w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section header */}
        <h2
          className={cn(
            'text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center transition-opacity duration-600',
            isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'
          )}
        >
          My <span className="text-primary">Projects</span>
        </h2>

        {/* Filter tabs */}
        <div
          className={cn(
            'flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 transition-opacity duration-600',
            isVisible ? 'opacity-100 animate-fade-in-delay-1' : 'opacity-0'
          )}
        >
          {PROJECT_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border-2',
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_25px_hsl(var(--primary)_/_0.6)] scale-105'
                  : 'bg-card text-foreground/70 border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary'
              )}
              aria-label={`Filter projects by ${filter.label}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Carousel container */}
        <div
          className={cn(
            'relative transition-opacity duration-600',
            isVisible ? 'opacity-100 animate-fade-in-delay-2' : 'opacity-0'
          )}
        >
          {filteredProjects.length > 0 ? (
            <>
              {/* Carousel viewport - mx for arrow spacing */}
              <div className="overflow-hidden mx-10 sm:mx-12" ref={emblaRef}>
                {/* py-4 provides vertical breathing room for hover scale effect */}
                <div className="flex gap-2 py-4">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-4px)] lg:flex-[0_0_calc(33.333%-6px)] min-w-0 flex justify-center"
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation arrows */}
              {filteredProjects.length > 3 && (
                <>
                  <button
                    onClick={scrollPrev}
                    disabled={!canScrollPrev}
                    className={cn(
                      'absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20',
                      'w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-background/90 backdrop-blur-sm',
                      'flex items-center justify-center',
                      'border border-primary/30 shadow-md',
                      'transition-all duration-200',
                      canScrollPrev
                        ? 'hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_0_15px_hsl(var(--primary)_/_0.5)]'
                        : 'opacity-30 cursor-not-allowed'
                    )}
                    aria-label="Previous projects"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  <button
                    onClick={scrollNext}
                    disabled={!canScrollNext}
                    className={cn(
                      'absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20',
                      'w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-background/90 backdrop-blur-sm',
                      'flex items-center justify-center',
                      'border border-primary/30 shadow-md',
                      'transition-all duration-200',
                      canScrollNext
                        ? 'hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_0_15px_hsl(var(--primary)_/_0.5)]'
                        : 'opacity-30 cursor-not-allowed'
                    )}
                    aria-label="Next projects"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </>
              )}

              {/* Dot indicators */}
              {scrollSnaps.length > 1 && (
                <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                  {scrollSnaps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={cn(
                        'w-2.5 h-2.5 rounded-full transition-all duration-200',
                        index === selectedIndex
                          ? 'bg-primary w-6 shadow-[0_0_10px_hsl(var(--primary)_/_0.6)]'
                          : 'bg-primary/30 hover:bg-primary/50'
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-foreground/90 font-medium py-8 sm:py-12">
              No projects found in this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
