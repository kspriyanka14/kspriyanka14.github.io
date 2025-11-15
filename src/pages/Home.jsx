import { ThemeToggle } from "../components/ThemeToggle";
import { DarkSpaceBackground } from "../components/DarkSpaceBackground";
import { LightSkyBackground } from "../components/LightSkyBackground";
import { HeroSection } from "../components/HeroSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";

export const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeToggle />

      {/* Conditional background rendering */}
      {isDarkMode ? <DarkSpaceBackground /> : <LightSkyBackground />}

      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
