# CV Application Architecture

## Component Structure

### Core Components
1. `AppComponent` - Root component
   - Header component
   - Router outlet
   - Footer component

2. `HeaderComponent`
   - Navigation menu
   - Search input
   - PDF export button

3. `FooterComponent`
   - Copyright info

### Feature Components
1. `CvContainerComponent`
   - Smart component managing CV data state
   - Handles filtering logic
   - Contains all CV section components

2. `CvBasicsComponent`
   - Displays title and summary
   - Shows highlight points
   - Responsive layout

3. Experience Section:
   - `CvExperienceComponent`
     * Container component
     * Manages experience data and filtering
     * Contains timeline and experience items
   
   - `CvExperienceItemComponent`
     * Displays company and position info
     * Shows responsibilities
     * Manages projects list
     * Handles filtering matches

   - `CvExperienceProjectComponent`
     * Shows project details and role
     * Displays technologies, achievements, challenges
     * Handles project-level filtering

4. Education & Certifications:
   - `CvEducationComponent`
     * Shows education history
     * Displays certifications
     * Integrates with timeline
     * Handles filtering

5. Skills Section:
   - `CvSkillsComponent`
     * Shows categorized skills
     * Supports grid/list view
     * Handles skill filtering

### Shared Components
1. `SearchComponent`
   - Search input with autocomplete
   - Filter chips for active filters
   - Section toggles
   - Basic date filtering

2. `TimelineComponent`
   - Reusable timeline visualization
   - Supports both experience and education
   - Highlights filtered periods

3. `PdfExportComponent`
   - Basic export configuration dialog
   - Section selection
   - Progress indicator
   - Download management

## State Management (NgRx)

### Store Structure
```typescript
interface AppState {
  cv: CvState;
  ui: UiState;
}

interface CvState {
  data: CvData | null;
  loading: boolean;
  error: string | null;
  filterTerm: string;
  filteredSections: {
    experience: boolean;
    education: boolean;
    skills: boolean;
  };
}

interface UiState {
  isMobile: boolean;
  darkMode: boolean;
  pdfExportInProgress: boolean;
}
```

### Actions
1. CV Data Actions
   - LoadCv
   - LoadCvSuccess
   - LoadCvFailure
   - SetFilterTerm
   - ToggleSectionFilter
   
2. UI Actions
   - SetMobileView
   - ToggleDarkMode
   - StartPdfExport
   - CompletePdfExport

### Effects
1. CV Data Effects
   - Load CV data from JSON
   - Filter CV data based on search terms
   - Handle PDF generation

2. UI Effects
   - Handle responsive layout changes
   - Manage PDF export process

## Services

1. `CvDataService`
   - Load CV data from JSON
   - Cache management
   - Data transformation helpers

2. `SearchService`
   - Search logic implementation
   - Keyword matching
   - Search result scoring

3. `PdfService`
   - PDF generation
   - Page layout management
   - Header/footer handling

4. `ResponsiveService`
   - Screen size detection
   - Layout adjustment helpers

## Routing Structure

```typescript
const routes: Routes = [
  {
    path: '',
    component: CvContainerComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: CvFullViewComponent },
      { path: 'experience', component: CvExperienceComponent },
      { path: 'education', component: CvEducationComponent },
      { path: 'skills', component: CvSkillsComponent }
    ]
  }
];
```

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