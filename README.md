# Troy Gianopoulos - Portfolio Website

A professional, production-ready portfolio website for Troy Gianopoulos built with React 18, Vite, and React Router v6. This modern, component-based application showcases film production work with full routing, dark mode, form validation, and responsive design.

## Features

- **Modern React Architecture** - Component-based design with React Hooks
- **Client-Side Routing** - Full navigation with React Router v6
- **Dark Mode** - Toggle between light and dark themes with localStorage persistence
- **Responsive Design** - Mobile-first approach with breakpoints for tablet and desktop
- **Form Validation** - Custom validation hook with real-time error feedback
- **CSS Modules** - Scoped styling with CSS Variables for consistent theming
- **Performance Optimized** - Lazy image loading, optimized assets, production-ready build

## Tech Stack

- **Build Tool**: Vite 5
- **Framework**: React 18
- **Routing**: React Router DOM v6
- **Styling**: CSS Modules with CSS Variables
- **State Management**: React Hooks (useState, useEffect)
- **Language**: JavaScript ES6+

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          - Navigation with mobile menu
│   ├── Footer.jsx          - Footer component
│   ├── Layout.jsx          - Main layout wrapper
│   ├── HeroSection.jsx     - Hero section with CTA buttons
│   ├── SectionHeader.jsx   - Reusable section header
│   ├── ProjectCard.jsx     - Individual project card
│   ├── ContactForm.jsx     - Contact form with validation
│   └── SkillsList.jsx      - Skills grid display
├── pages/
│   ├── Home.jsx            - Home page
│   ├── About.jsx           - About page with biography and skills
│   ├── Projects.jsx        - Projects showcase page
│   └── Contact.jsx         - Contact page with form
├── hooks/
│   └── useFormValidation.js - Custom form validation hook
├── data/
│   └── projects.js         - Project data and skills
├── styles/
│   ├── global.css          - Global styles and CSS variables
│   ├── components/         - Component-specific CSS modules
│   └── pages/              - Page-specific CSS modules
├── App.jsx                 - Main app with routing and dark mode
└── main.jsx                - React DOM entry point
```

## Setup Instructions

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository (or navigate to the project directory)

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

The application will open automatically at `http://localhost:5173`

## Available Scripts

### `npm run dev`
Starts the development server with hot module replacement (HMR)

### `npm run build`
Creates a production-optimized build in the `dist/` directory

### `npm run preview`
Preview the production build locally before deploying

### `npm run lint`
Run ESLint to check code quality

### `npm run typecheck`
Run TypeScript type checking

## Features Documentation

### Navigation
- Sticky navbar with active link highlighting
- Mobile-responsive hamburger menu
- Automatic scroll-to-top on navigation
- Dark mode toggle button

### Dark Mode
- Persisted theme preference in localStorage
- CSS Variables adapt to dark/light theme
- Smooth transitions between themes
- Affects all UI elements globally

### Form Validation
- Real-time validation feedback
- Errors shown only after field blur
- Error clearing on user input
- Submit button disabled while processing
- Success message display for 3 seconds

### Responsive Breakpoints
- **Mobile**: 320px - 480px (Hamburger menu, single column layout)
- **Tablet**: 481px - 768px (Adjusted spacing and sizing)
- **Desktop**: 769px+ (Full navigation, optimized grid layouts)

### Pages

#### Home
Welcome section with hero image, subtitle, and call-to-action buttons

#### About
Comprehensive biography with 4 paragraphs and skill grid (8 skills)
- Film Production
- Team Management
- Problem Solving
- Adaptability
- Web Development
- React
- JavaScript
- CSS

#### Projects
Showcase of 2 project categories with notable credits
- Feature Films (4 credits listed)
- Television (4+ credits listed)
- Links to IMDb profile for full filmography

#### Contact
Contact form with validation and success messaging
- Name field (minimum 2 characters)
- Email field (valid email format)
- Message field (minimum 10 characters)
- Success confirmation message

## Design System

### Colors
**Light Mode**:
- Background: #ffffff
- Secondary: #f5f5f5
- Text Primary: #111111
- Text Secondary: #666666
- Accent: #7a1993
- Accent Hover: #2e79bb

**Dark Mode**:
- Background: #111111
- Secondary: #1a1a1a
- Text Primary: #f0f0f0
- Text Secondary: #b0b0b0
- Accent: #9b4dbb
- Accent Hover: #4a9bd9

### Typography
- Font Family: Franklin Gothic Medium, system fonts
- Font Sizes: 12px - 48px (9 levels)
- Font Weights: 400, 500, 600, 700

### Spacing
- Base unit: 8px
- Scale: 8px, 16px, 24px, 40px, 80px

### Border Radius
- Small: 4px
- Medium: 6px
- Large: 8px
- XL: 12px
- Full: 9999px

## Performance Features

- **Lazy Image Loading**: Images load on demand with `loading="lazy"`
- **Code Splitting**: Route-based code splitting with React.lazy and Suspense
- **CSS Optimization**: CSS Modules prevent style conflicts
- **Production Build**: Minified assets with optimized bundle size

## Accessibility

- Semantic HTML5 structure
- ARIA labels on icon buttons
- Form labels properly associated with inputs
- Color contrast ratios meet WCAG standards
- Keyboard navigation support
- Focus visible styles

## SEO

- Meta descriptions for all pages
- Open Graph tags for social sharing
- Twitter card tags
- Proper heading hierarchy
- Semantic HTML elements
- Descriptive link text

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

The project is optimized for deployment on any static hosting platform (Vercel, Netlify, GitHub Pages, etc.)

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` folder to your hosting service

## License

This portfolio website is the property of Troy Gianopoulos.

## Contact

For inquiries, please visit the contact page or visit the IMDb profile at: https://www.imdb.com/name/nm4104645/
