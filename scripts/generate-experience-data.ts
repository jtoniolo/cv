import fs from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateExperienceModule() {
  try {
    // Read the experience data and schema
    const experienceData = await fs.readJson(
      path.resolve(__dirname, '../data/experience.json')
    );
    const experienceSchema = await fs.readJson(
      path.resolve(__dirname, '../data/experience.schema.json')
    );

    // Validate the experience data against the schema
    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(experienceSchema);
    const valid = validate(experienceData);

    if (!valid) {
      console.error('Experience data validation failed:', validate.errors);
      process.exit(1);
    }

    // Generate the TypeScript module content
    const moduleContent = `// This file is auto-generated. Do not edit directly.
import { ExperienceData } from '../models/experience.model';

export const EXPERIENCE_DATA: ExperienceData = ${JSON.stringify(
      experienceData,
      null,
      2
    )} as const;
`;

    // Ensure the directory exists
    const outputDir = path.resolve(__dirname, '../src/app/generated');
    await fs.ensureDir(outputDir);

    // Write the generated module
    await fs.writeFile(
      path.resolve(outputDir, 'experience-data.generated.ts'),
      moduleContent,
      'utf-8'
    );

    console.log('Experience data module generated successfully!');
  } catch (error) {
    console.error('Error generating experience data module:', error);
    process.exit(1);
  }
}

generateExperienceModule();
