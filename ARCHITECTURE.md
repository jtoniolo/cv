# Consulting Profile Application Architecture

## Overview

This application is a consulting/contractor profile with three distinct sections:

1. **Home Page**: Static marketing content (no data layer)
2. **Experience**: Data-driven CV with search/filter (NgRx + JSON)
3. **Contact**: Form with backend integration (minimal state)

## Component Structure

### Core Components

1. `AppComponent` - Root component

   - Header component
   - Router outlet
   - Footer component

2. `HeaderComponent`

   - Navigation menu (Home, Experience, Contact)
   - Search input (only visible on /experience route)
   - PDF export button (only visible on /experience route)

3. `FooterComponent`
   - Copyright info
   - Social/professional links

### Feature Components

#### 1. Home Page (Static)

- `HomeComponent`
  - **Pure static HTML/CSS component**
  - No TypeScript logic beyond Angular boilerplate
  - Content source: `copy/profile.md`
  - Uses Angular Material components for layout
  - No state management
  - No data services

#### 2. Experience Section (Data-Driven)

- `ExperienceComponent` (renamed from CvComponent)

  - Smart component managing experience data state
  - Handles filtering logic
  - Contains all experience section components

- `BasicsComponent`

  - Displays title and summary
  - Shows highlight points
  - Responsive layout

- Experience Items:

  - `ExperienceItemComponent`

    - Displays company and position info
    - Shows responsibilities
    - Manages projects list
    - Handles filtering matches

  - `ExperienceProjectComponent`
    - Shows project details and role
    - Displays technologies, achievements, challenges
    - Handles project-level filtering

- Education & Certifications:

  - `EducationComponent`
    - Shows education history
    - Displays certifications
    - Integrates with timeline
    - Handles filtering

- Skills Section:
  - `SkillsComponent`
    - Shows categorized skills
    - Supports grid/list view
    - Handles skill filtering

#### 3. Contact Form (Static Form + API)

- `ContactComponent`

  - Container component
  - Intro text from `copy/contact.md`
  - Integrates contact form component

- `ContactFormComponent`
  - Reactive form with validation
  - Cloudflare Turnstile integration
  - Submits to Cloudflare Worker backend
  - Minimal state (submission status only)

### Shared Components

1. `SearchComponent` (Experience page only)

   - Search input with autocomplete
   - Filter chips for active filters
   - Section toggles
   - Basic date filtering

2. `TimelineComponent` (Experience page only)

   - Reusable timeline visualization
   - Supports both experience and education
   - Highlights filtered periods

3. `PdfExportComponent` (Experience page only)
   - Basic export configuration dialog
   - Section selection
   - Progress indicator
   - Download management

## State Management (NgRx)

### Store Structure

```typescript
interface AppState {
  experience: ExperienceState; // Renamed from cv
  contact: ContactState; // New - minimal state
  ui: UiState;
}

interface ExperienceState {
  data: ExperienceData | null;
  loading: boolean;
  error: string | null;
  filterTerm: string;
  filteredSections: {
    experience: boolean;
    education: boolean;
    skills: boolean;
  };
}

interface ContactState {
  submitting: boolean;
  submitted: boolean;
  error: string | null;
  successMessage: string | null;
}

interface UiState {
  isMobile: boolean;
  darkMode: boolean;
  pdfExportInProgress: boolean;
}
```

### Actions

1. Experience Data Actions (renamed from CV)
   - LoadExperience
   - LoadExperienceSuccess
   - LoadExperienceFailure
   - SetFilterTerm
   - ToggleSectionFilter
2. Contact Actions (new)
   - SubmitContactForm
   - SubmitContactFormSuccess
   - SubmitContactFormFailure
   - ResetContactForm
3. UI Actions
   - SetMobileView
   - ToggleDarkMode
   - StartPdfExport
   - CompletePdfExport

### Effects

1. Experience Data Effects

   - Load experience data from JSON
   - Filter experience data based on search terms
   - Handle PDF generation

2. Contact Effects

   - Submit form to Cloudflare Worker
   - Handle API responses
   - Error handling

3. UI Effects
   - Handle responsive layout changes
   - Manage PDF export process

## Services

1. `ExperienceService` (renamed from CvDataService)

   - Load experience data from JSON
   - Cache management
   - Data transformation helpers

2. `SearchService` (Experience page only)

   - Search logic implementation
   - Keyword matching
   - Search result scoring

3. `PdfService` (Experience page only)

   - PDF generation
   - Page layout management
   - Header/footer handling

4. `ContactApiService` (new)

   - Submit form to Cloudflare Worker
   - Handle API responses
   - Error handling and retry logic

5. `ResponsiveService`
   - Screen size detection
   - Layout adjustment helpers

## Routing Structure

```typescript
const routes: Routes = [
  {
    path: "",
    component: HomeComponent, // Static home page
  },
  {
    path: "experience",
    component: ExperienceComponent, // Data-driven CV
  },
  {
    path: "contact",
    component: ContactComponent, // Form with API
  },
  {
    path: "**",
    redirectTo: "",
  },
];
```

## Content Architecture

### Static Content (Home & Contact)

- **No data layer**: Content directly in HTML templates
- **Source files**: `copy/profile.md` and `copy/contact.md` (reference only)
- **Implementation**: Convert markdown to HTML with Angular Material components
- **No state management**: Pure presentation components
- **No services**: No data fetching needed

### Data-Driven Content (Experience)

- **Data source**: `data/experience.json` with schema validation
- **State management**: Full NgRx implementation
- **Services**: ExperienceService, SearchService, PdfService
- **Features**: Search, filter, PDF export
- **Keywords**: Embedded in JSON for search functionality

## Material Design Implementation

### Theme

- Custom theme based on primary and accent colors
- Support for light/dark mode
- Consistent typography scale

### Components

1. Layout

   - mat-toolbar for header
   - mat-sidenav for mobile navigation
   - mat-card for content sections

2. Navigation

   - mat-tabs for section navigation
   - mat-menu for mobile menu
   - mat-button for actions

3. Content

   - mat-expansion-panel for expandable sections
   - mat-chip for skills and keywords
   - mat-list for experience items

4. Forms
   - mat-form-field for search input
   - mat-select for filters
   - mat-autocomplete for search suggestions

## Responsive Design Strategy

### Breakpoints

- xs: 0-599px (mobile)
- sm: 600-959px (tablet portrait)
- md: 960-1279px (tablet landscape)
- lg: 1280-1919px (desktop)
- xl: 1920px+ (large desktop)

### Layout Adjustments

1. Mobile

   - Single column layout
   - Collapsible sections
   - Bottom navigation
   - Floating action buttons

2. Tablet

   - Two column layout where appropriate
   - Side navigation
   - Expanded search options

3. Desktop
   - Multi-column layout
   - Persistent navigation
   - Advanced filtering options

## Performance Considerations

1. Optimization Techniques

   - Lazy loading for routes
   - Virtual scrolling for long lists
   - Image optimization
   - Code splitting

2. Caching Strategy

   - CV data caching
   - PDF template caching
   - Search result caching

3. Build Optimization
   - Tree shaking
   - Minification
   - Compression
