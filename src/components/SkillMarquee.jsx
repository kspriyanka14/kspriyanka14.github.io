import { cn } from '@/lib/utils';

/**
 * SkillMarquee component - Smooth rolling infinite scroll of skills with colored logos
 *
 * Features:
 * - Seamless infinite loop using two identical tracks
 * - GPU-accelerated animation with will-change
 * - Original colored Devicon logos (locally stored)
 * - Dark mode: white/grey glow with hint of primary for background separation
 * - Pause on hover for better UX
 * - Text sizes match HeroSection description (text-sm/base/lg)
 * - Configurable direction and speed
 *
 * @param {Object} props
 * @param {Array} props.skills - Array of skill objects with id, name, icon
 * @param {string} props.direction - Animation direction: "left" or "right"
 * @param {number} props.speed - Animation duration in seconds (higher = slower)
 * @returns {JSX.Element} Marquee row component
 */
export const SkillMarquee = ({ skills, direction = 'left', speed = 40 }) => {
  // Render a single set of skills
  const renderSkills = (keyPrefix) =>
    skills.map((skill, idx) => (
      <div
        key={`${keyPrefix}-${skill.id}-${idx}`}
        className="skill-item flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 flex-shrink-0"
      >
        {/* Skill logo - 1.5x size for prominence, glow in dark mode only */}
        <img
          src={`/images/skills/${skill.icon}`}
          alt={`${skill.name} logo`}
          className="skill-icon w-6 h-6 sm:w-7 sm:h-7 md:w-[1.875rem] md:h-[1.875rem] object-contain"
        />
        {/* Skill name - matches description text */}
        <span className="skill-text text-foreground/90 font-medium text-sm sm:text-base md:text-lg whitespace-nowrap">
          {skill.name}
        </span>
      </div>
    ));

  // CSS custom property for dynamic speed
  const marqueeStyle = {
    '--marquee-duration': `${speed}s`,
  };

  return (
    <div className="overflow-hidden relative" style={marqueeStyle}>
      {/* Marquee track - uses CSS custom property for duration */}
      <div
        className={cn(
          'marquee-track flex gap-2 sm:gap-3',
          direction === 'left' ? 'marquee-left' : 'marquee-right'
        )}
      >
        {/* First set */}
        <div className="flex gap-2 sm:gap-3 flex-shrink-0">
          {renderSkills('a')}
        </div>
        {/* Second set (duplicate) */}
        <div className="flex gap-2 sm:gap-3 flex-shrink-0">
          {renderSkills('b')}
        </div>
      </div>
    </div>
  );
};
