# CV UI

# Instructions for Copilot

Follow these guidlines

- Follow best practices.
- Comment code. Include jsdoc comments with parameters for all methods, classes, interfaces, etc.
- Use strict TypeScript type safety.
- Do not use the `any` type. Create types as needed.

# Application

This application is used to host the CV of the author.

- Build using Angular, Angular Material and NgRx.
- Use Yarn as the package manager.
- Do not specify package versions. Always install the latest.
- CV content should be stored in as json file.
- The json should include a keywords array for each section of the CV. The keywords will not be rendered. Instead, a search feature will be used to filter the CV by keyword.
- Generate a json schema for the json.
- Build individual components to make the app modular.
- We do not want a backend. This will be purely a client app.
- Use the Cli to generate the application.
- Header and footer should always be visible in the large screen online rendering
- I want to be able to export the filtered CV as a paginated PDF. Header and footers on each page.
- example.html contains an example cv. Different roles may have slightly different sections. We will need to account for this in the json and app layout.
- Use git to manage source control.
- Create a new branch for each task. The default origin branch to use as source is dev.
- I want to demo the app after you finish each task (if appropriate) so that I can provide feedback.
- I want to host on GitHub pages. Create a folder to deploy the app. You'll need to add a place-holder file (index.html) as first.
- Feel free to offer suggestions or add missing tasks.

# Tasks

1. Data Structure Setup
   - Convert example.html content into JSON format
   - Generate JSON schema for CV data validation
   - Add keywords array for each CV section

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

4. Core Experience Implementation
   - Create CV container and data service
   - Implement header with search and navigation
   - Add footer component
   - Build basics section component
   - Set up initial theme and responsive layout

5. Career Timeline Implementation
   - Create shared timeline component
   - Build experience section components
   - Implement experience filtering
   - Add company and position display
   - Integrate project details view

6. Supporting Sections
   - Implement education section with timeline integration
   - Build skills section with grid/list views
   - Add certifications display
   - Integrate section navigation

7. Search and Filter Feature
   - Implement search component with autocomplete
   - Add filter chips for active filters
   - Create search service with keyword matching
   - Integrate section toggling
   - Add search result highlighting

8. PDF Export Feature
   - Create PDF export component and service
   - Implement export configuration dialog
   - Add progress indicator
   - Handle pagination and headers/footers
   - Set up download management

9. Polish and Optimization
   - Implement dark mode toggle
   - Add responsive layout adjustments
   - Set up lazy loading
   - Implement caching strategy
   - Add error handling
   - Ensure accessibility compliance

10. Testing and Deployment
    - Write unit tests for components
    - Add integration tests for features
    - Set up GitHub Pages configuration
    - Create deployment workflow
    - Configure production build
    - Add documentation

