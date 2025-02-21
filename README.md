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

1. Convert the content of example.html into json.
2. Use the layout of example.html and the data in the generated json to inform the layout and components required for the app.
3. Determine which components will be needed. Update the tasks section of the README with tasks for each component. Renumber tasks as needed.
4. Add the Github Pages folder
5. Create the app.
6. Create a GitHub action that will be used to build and deploy the app to the pages folder. This will be triggered when merging a PR from dev to main.
5. Create components (replace this with component tasks).
6. Add search/filtering functionality.
7. Add export feature.

