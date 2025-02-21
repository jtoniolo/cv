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
   - Configure NgRx

4. Core Application Structure
   - Implement base layout (header/footer)
   - Create routing structure
   - Set up shared types and interfaces
   - Implement NgRx store basics

5. Component Development
   (To be expanded after component analysis in task 2)

6. Feature Implementation
   - Implement search/filtering functionality
   - Add PDF export feature with pagination
   - Implement responsive design adjustments

7. Testing and Quality Assurance
   - Unit tests for components
   - Integration tests for features
   - Accessibility testing
   - Performance optimization

8. Deployment Setup
   - Create GitHub Pages folder structure
   - Configure build settings for GitHub Pages
   - Create GitHub Actions workflow for automated deployment
   - Set up deployment branch structure (dev/main)

