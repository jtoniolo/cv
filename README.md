# Consulting Profile Application

## Overview

A comprehensive consulting/contractor profile application built with Angular, Angular Material, and NgRx. This application serves as a professional showcase with three main sections:

1. **Home Page**: Static marketing page with professional profile and value proposition
2. **Experience**: Data-driven CV section with search, filter, and PDF export capabilities
3. **Contact**: Form with Cloudflare Worker backend integration and Turnstile spam protection

### Key Features

- **Home Page**: Static HTML/CSS marketing content (pure presentation)
- **Experience**: Comprehensive CV with search, filter, and PDF export capabilities
- **Contact**: Form with backend integration (Cloudflare Worker + Turnstile)
- **Responsive Design**: Optimized for all screen sizes
- **Type-Safe**: Strict TypeScript implementation
- **State Management**: NgRx for experience section and form submission state
- **Content Approach**: Static content for home/contact, JSON-driven for experience

## Instructions for Copilot

Follow these guidelines:

- Follow best practices.
- Comment code. Include JSDoc comments with parameters for all methods, classes, interfaces, etc.
- Use strict TypeScript type safety.
- Do not use the `any` type. Create types as needed.

## Application Architecture

### Technology Stack

- **Framework**: Angular (latest)
- **UI Library**: Angular Material
- **State Management**: NgRx
- **Package Manager**: Yarn (always install latest versions)
- **Hosting**: GitHub Pages
- **Backend**: Cloudflare Worker (for contact form)

### Design Principles

- Build individual components to make the app modular
- **Home & Contact**: Static content directly in templates (no data files)
- **Experience**: Content stored as JSON with schema validation and keyword search
- Header and footer always visible on large screens
- Responsive design for all screen sizes
- PDF export for experience/CV section only

### Development Workflow

- Use git for source control
- Create a new branch for each task (branch from `dev`)
- Demo the app after each task completion for feedback
- Always verify changes with `yarn build` before testing
- Run `yarn start` to launch development server

# Project Structure

```
/
├── src/app/
│   ├── features/
│   │   ├── home/              # Home page - STATIC HTML/CSS only
│   │   ├── experience/        # CV/Experience - data-driven with JSON
│   │   └── contact/           # Contact form - static with API integration
│   ├── shared/                # Shared components, pipes, helpers
│   ├── state/                 # NgRx state (experience + contact submission)
│   ├── services/              # Application services
│   └── models/                # TypeScript interfaces and types
├── copy/                      # Reference content (profile.md, contact.md)
├── data/                      # JSON data files (experience only)
└── docs/                      # GitHub Pages deployment
```

## Development Instructions

### Setup

```bash
# Install dependencies
yarn install

# Generate data files
yarn generate-cv

# Start development server
yarn start
```

### Development Workflow

1. Always verify changes with `yarn build` first to check for build errors
2. Once build passes, run `yarn start` to launch the development server
3. Demo and verify changes in the browser
4. Run `yarn test` to ensure tests pass

### Build Commands

```bash
# Development build
yarn build

# Production build
yarn build:prod

# Run tests
yarn test

# Run tests in watch mode
yarn test:watch
```

## Deployment

The application is deployed to GitHub Pages. Production builds are automatically generated in the `docs/` folder.

```bash
# Build and deploy
yarn build:prod
git add docs/
git commit -m "Deploy to GitHub Pages"
git push
```

## Contact Form Backend

The contact form integrates with a Cloudflare Worker backend with Turnstile spam protection. Configuration is managed through environment files:

- `environment.ts` - Development configuration (local Cloudflare Worker, test Turnstile key)
- `environment.prod.ts` - Production configuration (deployed Worker, production Turnstile key)

## Content Management

### Static Content (Home & Contact Pages)

Static content is maintained as reference material in `copy/` directory:

- `copy/profile.md` - Source content for home page
- `copy/contact.md` - Source content for contact page intro

Convert markdown to HTML in component templates using Angular Material components.

### Data-Driven Content (Experience Section)

Experience/CV data is JSON-driven:

- `data/experience.json` - CV data with keywords for search
- `data/experience.schema.json` - JSON schema for validation
- Supports search, filter, and PDF export

## Documentation

- [Refactoring Plan](REFACTORING-PLAN.md) - Current refactoring roadmap
- [Architecture](ARCHITECTURE.md) - Application architecture details
- [Component Analysis](COMPONENT-ANALYSIS.md) - Component structure and data flow

## Original Tasks

1. Data Structure Setup

   - Convert example.html content into JSON format
   - Generate JSON schema for CV data validation
   - Add keywords array for each CV section
   - Validate JSON against schema

2. Application Architecture Planning

   - Analyze example.html layout
   - Determine required components and their relationships
   - Plan state management structure with NgRx
   - Document component specifications

3. Initial Application Setup

   - Create new Angular application with CLI
   - Configure TypeScript for strict mode
   - Set up Angular Material
   - Configure NgRx store and effects
   - Implement basic routing structure
   - Run `yarn build` to verify no build errors
   - Run `yarn start` and verify application loads

4. Core Experience Implementation

   - Create CV container and data service
   - Implement header with search and navigation
   - Add footer component
   - Build basics section component
   - Set up initial theme and responsive layout
   - Run `yarn build` to verify no build errors
   - Run `yarn start` and verify layout implementation

5. Career Timeline Implementation

   - Create shared timeline component
   - Build experience section components
   - Implement experience filtering
   - Add company and position display
   - Integrate project details view
   - Run `yarn build` to verify no build errors
   - Run `yarn start` and verify timeline functionality

6. Supporting Sections

   - Implement education section with timeline integration
   - Build skills section with grid/list views
   - Add certifications display
   - Integrate section navigation
   - Run `yarn build` to verify no build errors
   - Run `yarn start` and verify all sections

7. Search and Filter Feature

   - Implement search component with autocomplete
   - Add filter chips for active filters
   - Create search service with keyword matching
   - Add section selector component
   - Implement section visibility toggling
   - Integrate section visibility with search results
   - Add search result highlighting
   - Ensure default view shows all sections
   - Run `yarn build` to verify no build errors
   - Run `yarn start` and verify search and section functionality

8. PDF Export Feature

   - Create PDF export component and service
   - Implement export configuration dialog
   - Add progress indicator
   - Handle pagination and headers/footers
   - Set up download management
   - Run `yarn build` to verify no build errors
   - Run `yarn start` and verify PDF generation

9. Polish and Optimization

   - Implement dark mode toggle
   - Add responsive layout adjustments
   - Set up lazy loading
   - Implement caching strategy
   - Add error handling
   - Ensure accessibility compliance
   - Run `yarn build` to verify no build errors
   - Run `yarn start` and verify optimizations

10. Testing and Deployment
    - Write unit tests for components
    - Add integration tests for features
    - Set up GitHub Pages configuration
    - Create deployment workflow
    - Configure production build
    - Add documentation
    - Run `yarn build` to verify production build
    - Run `yarn test` to verify all tests pass
    - Deploy to GitHub Pages and verify deployment
