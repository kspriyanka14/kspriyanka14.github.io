import {
  Code2,
  Server,
  Database,
  Wrench,
  Palette,
  Layers,
  Cloud,
  FlaskConical,
} from "lucide-react";

/**
 * Skills data organized by category
 *
 * Structure:
 * - id: Unique identifier for the category
 * - title: Display name for the category
 * - icon: Lucide icon component
 * - skills: Array of skill names
 */
export const skillsData = [
  {
    id: "languages",
    title: "Languages",
    icon: Code2,
    skills: ["JavaScript", "Python", "HTML5", "CSS3", "SQL"],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: Layers,
    skills: [
      "React",
      "Tailwind CSS",
      "Bootstrap",
      "Vite",
      "EJS",
      "Responsive Design",
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "Flask",
      "REST APIs",
      "JWT",
      "Session Management",
    ],
  },
  {
    id: "database",
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    id: "design",
    title: "Design",
    icon: Palette,
    skills: [
      "Figma",
      "Canva",
      "Procreate",
      "Wireframing",
      "Prototyping",
      "Accessibility",
      "User Research",
    ],
  },
  {
    id: "devtools",
    title: "Development Tools",
    icon: Wrench,
    skills: ["VS Code", "Git", "GitHub", "GitLab", "Postman"],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    icon: Cloud,
    skills: ["Docker", "AWS", "Vercel", "GitHub Actions", "GitLab CI/CD"],
  },
  {
    id: "testing",
    title: "Testing & Documentation",
    icon: FlaskConical,
    skills: ["Jest", "Python Unittest", "LaTeX"],
  },
];
