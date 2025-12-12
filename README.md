# Personal Website

A modern, responsive personal website built to showcase my work, skills, and experience as a software engineer and designer.

## Overview

This is my personal website where I share information about myself, display my portfolio projects, highlight my technical skills, and provide ways to get in touch. The site emphasizes clean design, smooth animations, and excellent user experience across all devices.

The website follows modern web development best practices with a modular architecture, comprehensive documentation, and separation of concerns between data and presentation logic.

## Tech Stack

- **React** 19.1.1 - UI library for building component-based interfaces
- **Vite** 7.1.7 - Fast build tool and development server
- **Tailwind CSS** v4.1.17 - Utility-first CSS framework with custom theme
- **React Router** 7.9.5 - Client-side routing
- **Embla Carousel React** 8.6.0 - Smooth, touch-friendly carousel for projects
- **Lucide React** 0.553.0 - Icon library
- **ESLint** 9 - Code linting with React-specific rules

## Features

### Design & User Experience

- **Theme Toggle** - Switch between light and dark modes with persistent preference and system preference detection
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop screens
- **Smooth Animations** - Sequential fade-in effects and scroll-triggered animations
- **Custom Animated Backgrounds** - Dynamic starfield for dark mode, animated clouds for light mode

### Technical Features

- **Progressive Image Loading** - Tries AVIF → WebP → JPEG with automatic fallbacks
- **Theme-Aware Project Images** - Portfolio projects display different screenshots in light/dark mode
- **Project Carousel** - Embla-powered smooth carousel with navigation arrows and dot indicators
- **Project Filtering** - Filter projects by category (fullstack, frontend, backend, AI/ML, design, desktop, devops)
- **Card Flip Animation** - Project cards flip to show descriptions on hover or tap
- **Skills Marquee** - Animated scrolling display of tech skills with colored logos in the hero section
- **Hover Effects** - Glowing borders, light reflection animations, and interactive feedback throughout

### Content Organization

- **Modular Data Structure** - All content separated from components for easy updates
- **Skills Display** - Rolling marquee showcasing 26 tech skills with original colored Devicon logos
- **Featured Projects** - Key projects appear first in the carousel
- **Contact Information** - Email, LinkedIn, GitHub, and Instagram links with smooth interactions

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed on your machine
- A code editor (VS Code recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kspriyanka14/kspriyanka14.github.io.git
cd kspriyanka14.github.io
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This generates a `dist/` directory with all the static files ready for deployment. The build process:

- Minifies JavaScript and CSS
- Optimizes images and assets
- Generates source maps for debugging
- Creates efficient code-split bundles

To test the production build locally:

```bash
npm run preview
```

## Managing Content

All content is stored in data files for easy updates without touching component code.

### Adding a New Project

1. **Update `/src/data/projects.json`:**

```json
{
  "id": "project-id",
  "name": "Project Name",
  "description": "Brief description of the project",
  "tags": ["fullstack", "frontend"],
  "featured": false,
  "githubLink": "https://github.com/username/repo",
  "liveDemoLink": "https://demo-url.com",
  "videoLink": "",
  "imageName": "project-id",
  "techStack": ["React", "Node.js", "MongoDB"]
}
```

2. **Add project images** to `/public/images/projects/project-id/`:
   - `project-id.avif` (best compression)
   - `project-id.webp` (good compression)
   - `project-id.jpg` (universal fallback)

All images should be 16:9 aspect ratio for consistency.

### Updating Skills

Edit `/src/data/skills.js` to add or modify skills. Skills are displayed as a rolling marquee with logos:

```javascript
{
  id: "skill-id",
  name: "Skill Name",
  icon: "icon-filename.svg"  // Icon from /public/images/skills/
}
```

### Updating Personal Information

Edit `/src/data/navigation.js` to update:

- Name and tagline
- About content
- Contact email and social links

### Image Requirements

**Profile Picture:**

- Location: `/public/images/profile/`
- Aspect ratio: 1:1 (square)
- Formats: `profile.avif`, `profile.webp`, `profile.jpg`

**Project Screenshots:**

- Location: `/public/images/projects/{project-id}/`
- Aspect ratio: 16:9
- Formats: `{imageName}.avif`, `{imageName}.webp`, `{imageName}.jpg`

**Skill Icons:**

- Location: `/public/images/skills/`
- Format: SVG (original colored Devicon logos)
