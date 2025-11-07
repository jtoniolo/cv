# Refactoring Plan: CV App to Consulting Profile

## Overview

Transform the current CV-only application into a comprehensive consulting/contractor profile with three main sections:

1. **Home Page**: Initial pitch and profile overview (static content)
2. **Experience**: CV and work history (data-driven with JSON, search, filter - existing functionality)
3. **Contact**: Contact form connected to Cloudflare Worker backend (static form, API integration)

### Content Approach

- **Experience Section**: Data-driven (JSON file) - requires search, filter, and dynamic content
- **Home & Contact**: Static content - simpler implementation, content edited directly in components

## Current State Analysis

### Existing Structure

- Single-page CV application
- NgRx state management
- Angular Material UI
- JSON-based CV data
- Search and filter functionality
- PDF export capability
- Responsive design

### Strengths to Preserve

- NgRx architecture (for experience section)
- Component modularity
- TypeScript type safety
- Responsive design patterns
- Material Design implementation
- Search/filter functionality (experience section only)

### Simplifications

- Home page: No JSON data, no state management needed
- Contact form: Minimal state (submission status only), no complex data structure

## New Application Structure

### Route Structure

```
/                     → Home/Profile page
/experience           → CV/Experience section (existing CV component)
/contact              → Contact form
```

### Component Hierarchy

```
AppComponent (Root)
├── HeaderComponent (updated with new navigation)
├── RouterOutlet
│   ├── HomeComponent (NEW)
│   ├── ExperienceComponent (REFACTORED from CvComponent)
│   └── ContactComponent (NEW)
└── FooterComponent (updated)
```

## Refactoring Tasks

### Phase 1: Planning and Documentation (Current)

#### 1.1 Update Documentation

- [x] Create REFACTORING-PLAN.md
- [x] Update README.md with new application purpose
- [x] Update ARCHITECTURE.md with new structure
- [x] Update package.json name and description

#### 1.2 Data Structure Planning

- [ ] ~~Plan home page content~~ - NO DATA! Pure static HTML
- [ ] Keep existing cv.json structure (rename to experience.json)
- [ ] Plan contact form data model (TypeScript interface for form submission only)
- [ ] Design Cloudflare Worker API contract

### Phase 2: Foundation Updates

#### 2.1 Project Configuration

- [x] Update project name in angular.json
- [x] Update package.json metadata
- [x] Update deployment configuration for GitHub Pages
- [x] Update CNAME if needed (not present)

#### 2.2 Routing Setup

- [x] Create new route structure (/, /experience, /contact)
- [x] Set up lazy loading for feature modules (using standalone components)
- [x] Add route guards if needed (not needed for current routes)
- [x] Update navigation menu

#### 2.3 State Management Restructuring

- [x] Refactor cv state to experience state (full rename)
- [x] Create contact state for form submission only (minimal)
- [x] Remove any unused state (no profile state needed)
- [x] Update store configuration
- [x] Refactor selectors and actions

### Phase 3: Component Refactoring

#### 3.1 Rename and Reorganize CV Components

- [x] Rename cv/ feature folder to experience/
- [x] Update component names (CvComponent → ExperienceComponent)
- [x] Update imports and references
- [x] Update route configurations
- [x] Update tests

#### 3.2 Header Component Updates

- [x] Add new navigation items (Home, Experience, Contact)
- [x] Update active route highlighting
- [x] Keep search functionality (only active on /experience route)
- [x] Update responsive menu

#### 3.3 Footer Component Updates

- [x] Update branding/copyright (added name from experience data)
- [x] Add relevant links (GitHub, LinkedIn, etc.)
- [x] Update styling to match new theme (responsive layout)

### Phase 4: Home Page Implementation

#### 4.1 Pure Static Marketing Page

Home page is **PURE STATIC HTML/CSS** - just sales copy in templates with Angular Material components.

**NO TypeScript logic needed beyond basic Angular boilerplate:**

- No interfaces/types for content
- No data properties
- No methods
- No services
- No state management
- No @Input decorators

**Just HTML templates with:**

- Angular Material components (mat-card, mat-button, etc.)
- Static text and copy
- CSS/SCSS styling
- Material icons

#### 4.2 Components to Create

- [ ] HomeComponent - Empty TypeScript class, all content in `home.component.html`
- **NO sub-components needed** - use Angular Material components directly in template

#### 4.3 Implementation Approach

```typescript
// home.component.ts - MINIMAL
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule /* etc */],
})
export class HomeComponent {
  // EMPTY - No properties, no methods, nothing!
}
```

```html
<!-- home.component.html - ALL CONTENT HERE -->
<!-- Convert copy/profile.md content to HTML with Angular Material components -->
<div class="hero-section">
  <h1>Tired of projects that drag on...</h1>
  <p>Senior Systems Architect...</p>
</div>

<div class="services">
  <mat-card>
    <mat-card-title>I can help you:</mat-card-title>
    <mat-card-content>
      <ul>
        <li>Build full stack applications...</li>
      </ul>
    </mat-card-content>
  </mat-card>
  <!-- etc -->
</div>
```

#### 4.4 Content Reference

- **Source**: `copy/profile.md`
- Convert markdown to HTML/Angular Material components
- Maintain content structure and messaging
- Style with Material Design components

### Phase 5: Contact Form Implementation

#### 5.1 Form Structure

```typescript
interface ContactForm {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact?: "email" | "phone";
  interests?: string[];
}
```

#### 5.2 Components to Create

- [ ] ContactComponent (container)
- [ ] ContactFormComponent (with Cloudflare Turnstile integration)
- [ ] FormSuccessComponent
- [ ] FormErrorComponent

#### 5.2.1 Content Reference

- **Source**: `copy/contact.md`
- Convert markdown intro text to HTML
- Implement form below the introductory copy
- Add Cloudflare Turnstile for spam protection

#### 5.3 State Management (Minimal)

- [ ] Create contact.actions.ts (for form submission state only)
- [ ] Create contact.reducer.ts (submission status, success/error messages)
- [ ] Create contact.selectors.ts
- [ ] Create contact.effects.ts (API call handling)
- [ ] Create contact.state.ts
- **Note**: Only managing submission state, not form content (form content is static)

#### 5.4 Backend Integration

- [ ] Create ContactService for API calls
- [ ] Define API endpoints (Cloudflare Worker)
- [ ] Implement error handling
- [ ] Add form validation
- [ ] Integrate Cloudflare Turnstile (spam protection)
- [ ] Create environment configuration for API URLs and Turnstile site key

#### 5.5 Cloudflare Worker (Separate Task)

```typescript
// API Contract
POST /api/contact
Request: ContactForm
Response: {
  success: boolean;
  message: string;
  id?: string;
}
```

- [ ] Set up Cloudflare Worker project
- [ ] Implement contact form handler
- [ ] Add email delivery (e.g., via SendGrid, Mailgun, etc.)
- [ ] Add rate limiting
- [ ] Add CORS configuration
- [ ] Deploy to Cloudflare

### Phase 6: Styling and Theming

#### 6.1 Design System Updates

- [ ] Update color palette for consulting theme
- [ ] Create/update typography scale
- [ ] Define spacing system
- [ ] Update Material theme configuration

#### 6.2 Component Styling

- [ ] Style home page components
- [ ] Update experience page styling (subtle updates)
- [ ] Style contact form
- [ ] Ensure consistency across all pages

#### 6.3 Responsive Design

- [ ] Test and adjust mobile layouts
- [ ] Test tablet layouts
- [ ] Test desktop layouts
- [ ] Test print styles (for experience page)

### Phase 7: Navigation and User Experience

#### 7.1 Navigation Enhancements

- [ ] Add smooth scrolling
- [ ] Add route transitions
- [ ] Add loading states
- [ ] Add breadcrumbs if needed

#### 7.2 SEO and Meta Tags

- [ ] Add page titles
- [ ] Add meta descriptions
- [ ] Add Open Graph tags
- [ ] Add structured data (Schema.org)

#### 7.3 Analytics (Optional)

- [ ] Add Google Analytics or alternative
- [ ] Track page views
- [ ] Track form submissions
- [ ] Track PDF downloads

### Phase 8: Testing

#### 8.1 Unit Tests

- [ ] Update existing tests for renamed components (experience)
- [ ] ~~Write tests for HomeComponent~~ - Minimal/no tests needed (static HTML)
- [ ] Write tests for ContactComponent form logic
- [ ] Write tests for contact API service
- [ ] Write tests for contact state management

#### 8.2 Integration Tests

- [ ] Test routing and navigation
- [ ] Test form submission flow
- [ ] Test state management flow
- [ ] Test responsive behavior

#### 8.3 E2E Tests (Optional)

- [ ] Create E2E test suite
- [ ] Test user flows
- [ ] Test form validation
- [ ] Test API integration

### Phase 9: Documentation and Deployment

#### 9.1 Documentation

- [ ] Update README.md with setup instructions
- [ ] Document new components
- [ ] Document API integration
- [ ] Document deployment process
- [ ] Add inline code documentation

#### 9.2 Build and Deploy

- [ ] Test production build
- [ ] Update build scripts
- [ ] Deploy to GitHub Pages
- [ ] Verify all routes work
- [ ] Verify API integration

#### 9.3 Post-Deployment

- [ ] Test contact form in production
- [ ] Verify analytics
- [ ] Monitor error logs
- [ ] Gather feedback

## Migration Strategy

### Approach: Gradual Refactoring

1. **Keep existing functionality working** - maintain experience/CV features
2. **Add new features incrementally** - start with home page (simple static), then contact (API integration)
3. **Simplify where possible** - only experience section needs data/state complexity
4. **Test at each stage** - ensure nothing breaks
5. **Deploy iteratively** - can deploy home and experience before contact is ready

### Risk Mitigation

- Use feature branches for major changes
- Keep comprehensive tests
- Maintain backwards compatibility during transition
- Have rollback plan ready

## File Renaming Map

### Folders

```
src/app/features/cv/          → src/app/features/experience/
src/app/state/cv/             → src/app/state/experience/
```

### Files

```
cv.component.*                → experience.component.*
cv.service.ts                 → experience.service.ts
cv.model.ts                   → experience.model.ts
cv-data.generated.ts          → experience-data.generated.ts
cv.actions.ts                 → experience.actions.ts
cv.reducer.ts                 → experience.reducer.ts
cv.selectors.ts               → experience.selectors.ts
cv.effects.ts                 → experience.effects.ts
cv.state.ts                   → experience.state.ts
data/cv.json                  → data/experience.json
data/cv.schema.json           → data/experience.schema.json
data/cv.example.json          → data/experience.example.json
```

## New Files to Create

### Home Page

```
src/app/features/home/
├── home.component.ts          (minimal, empty class)
├── home.component.html        (ALL content here - pure HTML/CSS)
├── home.component.scss        (styling only)
└── home.component.spec.ts     (minimal or none)
```

**NO sub-components, NO data files, NO services, NO state!**

### Contact Page

```
src/app/features/contact/
├── contact.component.ts
├── contact.component.html
├── contact.component.scss
├── contact.component.spec.ts
└── components/
    ├── contact-form/
    ├── form-success/
    └── form-error/
```

### State Management

```
src/app/state/
├── experience/  (renamed from cv/)
│   ├── experience.actions.ts
│   ├── experience.reducer.ts
│   ├── experience.selectors.ts
│   ├── experience.effects.ts
│   └── experience.state.ts
└── contact/  (minimal - submission state only)
    ├── contact.actions.ts
    ├── contact.reducer.ts
    ├── contact.selectors.ts
    ├── contact.effects.ts
    └── contact.state.ts
```

### Services

```
src/app/services/
├── experience.service.ts (renamed from cv.service.ts)
├── contact-api.service.ts (for Cloudflare Worker calls)
└── (NO profile.service.ts - static content only)
```

### Models

```
src/app/models/
├── experience.model.ts (renamed from cv.model.ts)
├── contact-form.model.ts
└── api-response.model.ts
```

### Data (Experience/CV Only)

```
data/
├── experience.json (renamed from cv.json)
├── experience.schema.json (renamed from cv.schema.json)
└── experience.example.json (renamed from cv.example.json)
```

### Content Reference Files

```
copy/
├── profile.md       (source content for home page)
└── contact.md       (source content for contact page intro)
```

**Content files are reference material only - convert to HTML in component templates!**

## Dependencies to Add

### Potential New Dependencies

- Cloudflare Turnstile library (for spam protection on contact form)
- Animation library (optional, if complex animations needed)
- **Note**: Angular Forms is sufficient for contact form validation

## Configuration Updates

### Environment Files

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:8787", // Cloudflare Worker local
  turnstileSiteKey: "your-turnstile-site-key",
};

// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: "https://your-worker.workers.dev",
  turnstileSiteKey: "your-turnstile-site-key",
};
```

## Success Criteria

### Phase 1 Complete

- [ ] All documentation updated
- [ ] Refactoring plan approved
- [ ] Static content structure planned (home page)
- [ ] Contact form model designed

### Phase 2 Complete

- [ ] Routes configured
- [ ] State management restructured
- [ ] Build still works

### Phase 3 Complete

- [x] CV components renamed to Experience
- [x] All references updated
- [x] Build succeeds

### Phase 4 Complete

- [ ] Home page implemented (pure static HTML/Material components)
- [ ] Navigation works
- [ ] Responsive styling complete
- [ ] **ZERO TypeScript logic added!**

### Phase 5 Complete

- [ ] Contact form works
- [ ] API integration complete
- [ ] Form validation working
- [ ] Error handling in place

### Final Complete

- [ ] All pages functional
- [ ] All tests passing
- [ ] Deployed to production
- [ ] Documentation complete
- [ ] Contact form receiving messages

## Timeline Estimate

- **Phase 1**: 1-2 hours (Planning and Documentation)
- **Phase 2**: 2-3 hours (Foundation Updates)
- **Phase 3**: 3-4 hours (Component Refactoring)
- **Phase 4**: 2-3 hours (Home Page - just HTML/CSS!)
- **Phase 5**: 6-8 hours (Contact Form + API)
- **Phase 6**: 3-4 hours (Styling and Theming)
- **Phase 7**: 2-3 hours (Navigation and UX)
- **Phase 8**: 4-6 hours (Testing)
- **Phase 9**: 2-3 hours (Documentation and Deployment)

**Total Estimate**: 25-37 hours (reduced from 29-41 - simpler home page!)

## Next Steps

1. Review and approve this refactoring plan
2. Start with Phase 1.2: Update README.md
3. Proceed systematically through each phase
4. Test and demo after each major phase
5. Deploy incrementally as features are completed

---

**Note**: This is a living document. Update as the refactoring progresses and requirements evolve.
