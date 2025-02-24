import fs from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateCvModule() {
  try {
    // Read the CV data and schema
    const cvData = await fs.readJson(
      path.resolve(__dirname, '../data/cv.json')
    );
    const cvSchema = await fs.readJson(
      path.resolve(__dirname, '../data/cv.schema.json')
    );

    // Validate the CV data against the schema
    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(cvSchema);
    const valid = validate(cvData);

    if (!valid) {
      console.error('CV data validation failed:', validate.errors);
      process.exit(1);
    }

    // Generate the TypeScript module content
    const moduleContent = `// This file is auto-generated. Do not edit directly.
import { CvData } from '../models/cv.model';

export const CV_DATA: CvData = ${JSON.stringify(cvData, null, 2)} as const;
`;

    // Ensure the directory exists
    const outputDir = path.resolve(__dirname, '../src/app/generated');
    await fs.ensureDir(outputDir);

    // Write the generated module
    await fs.writeFile(
      path.resolve(outputDir, 'cv-data.generated.ts'),
      moduleContent,
      'utf-8'
    );

    console.log('CV data module generated successfully!');
  } catch (error) {
    console.error('Error generating CV data module:', error);
    process.exit(1);
  }
}

generateCvModule();
