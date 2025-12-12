/**
 * Skills data with Devicon file references for colored logo rendering
 *
 * Structure:
 * - id: Unique identifier for the skill
 * - name: Display name for the skill
 * - icon: Devicon SVG filename (stored in /public/images/skills/)
 *
 * Icons sourced from Devicon (https://devicon.dev) - colored originals
 * Stored locally for optimal performance (no external requests)
 */
export const skillsWithLogos = [
  // Languages
  { id: 'javascript', name: 'JavaScript', icon: 'javascript-original.svg' },
  { id: 'python', name: 'Python', icon: 'python-original.svg' },
  { id: 'html5', name: 'HTML5', icon: 'html5-original.svg' },
  { id: 'css3', name: 'CSS3', icon: 'css3-original.svg' },

  // Frontend
  { id: 'react', name: 'React', icon: 'react-original.svg' },
  { id: 'tailwindcss', name: 'Tailwind CSS', icon: 'tailwindcss-original.svg' },
  { id: 'bootstrap', name: 'Bootstrap', icon: 'bootstrap-original.svg' },
  { id: 'vite', name: 'Vite', icon: 'vitejs-original.svg' },

  // Backend
  { id: 'nodejs', name: 'Node.js', icon: 'nodejs-original.svg' },
  { id: 'express', name: 'Express.js', icon: 'express-original.svg' },
  { id: 'flask', name: 'Flask', icon: 'flask-original.svg' },

  // Databases
  { id: 'postgresql', name: 'PostgreSQL', icon: 'postgresql-original.svg' },
  { id: 'mongodb', name: 'MongoDB', icon: 'mongodb-original.svg' },
  { id: 'mysql', name: 'MySQL', icon: 'mysql-original.svg' },

  // Design
  { id: 'figma', name: 'Figma', icon: 'figma-original.svg' },
  { id: 'canva', name: 'Canva', icon: 'canva-original.svg' },

  // DevTools
  { id: 'vscode', name: 'VS Code', icon: 'vscode-original.svg' },
  { id: 'git', name: 'Git', icon: 'git-original.svg' },
  { id: 'github', name: 'GitHub', icon: 'github-original.svg' },
  { id: 'gitlab', name: 'GitLab', icon: 'gitlab-original.svg' },
  { id: 'postman', name: 'Postman', icon: 'postman-original.svg' },

  // DevOps
  { id: 'docker', name: 'Docker', icon: 'docker-original.svg' },
  { id: 'aws', name: 'AWS', icon: 'amazonwebservices-original-wordmark.svg' },
  { id: 'vercel', name: 'Vercel', icon: 'vercel-original.svg' },
  {
    id: 'githubactions',
    name: 'GitHub Actions',
    icon: 'githubactions-original.svg',
  },

  // Testing
  { id: 'jest', name: 'Jest', icon: 'jest-plain.svg' },
];
