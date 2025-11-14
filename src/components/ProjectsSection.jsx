import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Play } from "lucide-react";
import { ProgressiveImage } from "@/components/ProgressiveImage";
import { PROJECT_FILTERS } from "@/data/constants";
import projectsData from "@/data/projects.json";

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
 * @param {boolean} props.featured - Whether this is a featured project
 * @returns {JSX.Element} Project card component
 */
const ProjectCard = ({ project, featured = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const maxTechStack = featured ? 20 : 10;
  const displayedTechStack = project.techStack.slice(0, maxTechStack);

  const handleFlipToggle = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`group bg-card rounded-lg shadow-md border-2 border-primary/20 overflow-hidden flex flex-col transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)_/_0.5)] hover:scale-[1.03] relative before:absolute before:top-0 before:bottom-0 before:w-[50%] before:-left-full before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/20 before:to-transparent before:skew-x-[-20deg] before:z-10 hover:before:animate-shine ${
        featured ? "w-full max-w-2xl" : "w-full max-w-sm"
      }`}
    >
      {/* Flip container for image/description */}
      <div
        className="relative w-full cursor-pointer border-b-2 border-primary/20"
        style={{ aspectRatio: "16/9", perspective: "1000px" }}
        onClick={handleFlipToggle}
      >
        <div
          className={`absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
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
        <div
          className={`flex flex-wrap justify-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border ${
            featured ? "gap-3 sm:gap-4" : ""
          }`}
        >
          {/* GitHub link (always shown) */}
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 rounded-lg font-medium text-foreground/90 border border-border/50 bg-card/50 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.5)] hover:!text-primary hover:scale-105 active:scale-95 ${
              featured
                ? "px-3 py-1.5 gap-2 text-xs sm:text-sm"
                : "px-2 py-1 text-xs"
            }`}
            aria-label={`View ${project.name} code`}
          >
            <Github className={featured ? "h-4 w-4" : "h-3.5 w-3.5"} />
            <span>Code</span>
          </a>

          {/* Live demo link (optional) */}
          {project.liveDemoLink && (
            <a
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 rounded-lg font-medium text-foreground/90 border border-border/50 bg-card/50 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.5)] hover:!text-primary hover:scale-105 active:scale-95 ${
                featured
                  ? "px-3 py-1.5 gap-2 text-xs sm:text-sm"
                  : "px-2 py-1 text-xs"
              }`}
              aria-label={`View ${project.name} live demo`}
            >
              <ExternalLink className={featured ? "h-4 w-4" : "h-3.5 w-3.5"} />
              <span>Demo</span>
            </a>
          )}

          {/* Video demo link (optional) */}
          {project.videoLink && (
            <a
              href={project.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 rounded-lg font-medium text-foreground/90 border border-border/50 bg-card/50 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.5)] hover:!text-primary hover:scale-105 active:scale-95 ${
                featured
                  ? "px-3 py-1.5 gap-2 text-xs sm:text-sm"
                  : "px-2 py-1 text-xs"
              }`}
              aria-label={`Watch ${project.name} video demo`}
            >
              <Play className={featured ? "h-4 w-4" : "h-3.5 w-3.5"} />
              <span>Video</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * ProjectsSection component - Static responsive grids for featured and filtered projects
 *
 * Features:
 * - Responsive grid layout (1 col mobile → 2 col tablet → 3 col desktop → 4 col large)
 * - Featured projects grid
 * - Tab-based filtering for all projects
 * - No horizontal scrolling - natural wrapping
 * - Border glow on hover
 *
 * @returns {JSX.Element} Projects section with static responsive grids
 */
export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
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

  const featuredProjects = projectsData.filter((project) => project.featured);
  const allProjects = projectsData;

  const filterProjects = (projects) => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.tags.includes(activeFilter));
  };

  const filteredProjects = filterProjects(allProjects);

  // Animation delay calculation for projects
  const getProjectDelay = (index, isFeatured = false) => {
    const baseDelay = isFeatured ? 0.2 : 0.1;
    const cardDelay = 0.15;
    return `${baseDelay + (index + 1) * cardDelay}s`;
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 relative z-10"
    >
      <div className="container mx-auto max-w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section header */}
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-12 md:mb-16 text-center transition-opacity duration-600 ${
            isVisible ? "opacity-100 animate-fade-in" : "opacity-0"
          }`}
        >
          My <span className="text-primary">Projects</span>
        </h2>

        {/* Featured Projects - Static Grid */}
        {featuredProjects.length > 0 && (
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h3
              className={`text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-center transition-opacity duration-600 ${
                isVisible ? "opacity-100 animate-fade-in-delay-1" : "opacity-0"
              }`}
            >
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 justify-items-center max-w-7xl mx-auto">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="w-full flex justify-center opacity-0"
                  style={
                    isVisible
                      ? {
                          animation: `fadeIn 0.6s ease-out ${getProjectDelay(
                            index,
                            true
                          )} forwards`,
                        }
                      : {}
                  }
                >
                  <ProjectCard project={project} featured={true} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Projects with Filter Tabs - Static Grid */}
        <div>
          <h3
            className={`text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-center transition-opacity duration-600 ${
              isVisible ? "opacity-100 animate-fade-in-delay-2" : "opacity-0"
            }`}
          >
            All Projects
          </h3>

          {/* Filter tabs */}
          <div
            className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 transition-opacity duration-600 ${
              isVisible ? "opacity-100 animate-fade-in-delay-3" : "opacity-0"
            }`}
          >
            {PROJECT_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border-2 ${
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_25px_hsl(var(--primary)_/_0.6)] scale-105"
                    : "bg-card text-foreground/70 border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary"
                }`}
                aria-label={`Filter projects by ${filter.label}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Filtered projects - Static Grid (Max 3 columns) */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 justify-items-center max-w-6xl mx-auto">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="w-full flex justify-center opacity-0"
                  style={
                    isVisible
                      ? {
                          animation: `fadeIn 0.6s ease-out ${getProjectDelay(
                            index,
                            false
                          )} forwards`,
                        }
                      : {}
                  }
                >
                  <ProjectCard project={project} featured={false} />
                </div>
              ))}
            </div>
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
