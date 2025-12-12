import { Instagram, Linkedin, Mail, Github } from 'lucide-react';
import { contactInfo } from '@/data/navigation';

/**
 * ContactSection component - Displays contact information and social links
 *
 * Features:
 * - Primary contact methods (Email, LinkedIn)
 * - Social media links (GitHub, Instagram)
 * - Seeking opportunities description
 * - Hover effects and responsive layout
 *
 * @returns {JSX.Element} Contact section with information and links
 */
export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 px-4 relative bg-secondary/10 z-10"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Section header */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Contact <span className="text-primary">Me</span>
        </h2>

        {/* Seeking opportunities description */}
        <p className="text-center text-foreground/90 font-medium mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base text-left px-4">
          I'm currently seeking full-time and internship opportunities as a{' '}
          <span className="text-foreground font-semibold">
            Software Engineer
          </span>
          ,{' '}
          <span className="text-foreground font-semibold">
            Full-Stack Developer
          </span>
          ,{' '}
          <span className="text-foreground font-semibold">
            Frontend/Backend Developer
          </span>
          ,{' '}
          <span className="text-foreground font-semibold">DevOps Engineer</span>
          , or{' '}
          <span className="text-foreground font-semibold">UI/UX Designer</span>.
          Whether you want to discuss opportunities or just say hello, feel free
          to contact me through the following communication channels.
        </p>

        <div className="max-w-2xl mx-auto">
          {/* Primary contact methods */}
          <h3 className="text-xl md:text-2xl font-semibold mb-8 text-center">
            Primary Contact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {/* Email Card */}
            <div className="group bg-card p-6 rounded-lg shadow-md border-2 border-primary/20 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)_/_0.5)]">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.6)]">
                  <Mail className="h-6 w-6 text-primary transition-all duration-300 group-hover:text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground/90">
                    Email
                  </h4>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-foreground/90 font-medium transition-all duration-300 text-sm break-all hover:text-primary"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="group bg-card p-6 rounded-lg shadow-md border-2 border-primary/20 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)_/_0.5)]">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.6)]">
                  <Linkedin className="h-6 w-6 text-primary transition-all duration-300 group-hover:text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground/90">
                    LinkedIn
                  </h4>
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/90 font-medium transition-all duration-300 text-sm break-all hover:text-primary"
                  >
                    linkedin.com/in/priyankaks0114
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social media section */}
          <div className="text-center">
            <h4 className="font-semibold mb-6 text-lg text-foreground/90">
              Connect on Social Media
            </h4>
            <div className="flex gap-6 justify-center">
              {/* GitHub */}
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-full bg-card transition-all duration-300 hover:scale-110 border-2 border-primary/20 shadow-md hover:border-primary hover:bg-primary hover:shadow-[0_0_25px_hsl(var(--primary)_/_0.6)]"
                aria-label="GitHub Profile"
              >
                <Github className="h-6 w-6 text-primary transition-all duration-700 group-hover:text-primary-foreground group-hover:[transform:rotate(360deg)]" />
              </a>

              {/* Instagram */}
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-full bg-card transition-all duration-300 hover:scale-110 border-2 border-primary/20 shadow-md hover:border-primary hover:bg-primary hover:shadow-[0_0_25px_hsl(var(--primary)_/_0.6)]"
                aria-label="Instagram Profile"
              >
                <Instagram className="h-6 w-6 text-primary transition-all duration-700 group-hover:text-primary-foreground group-hover:[transform:rotate(360deg)]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
