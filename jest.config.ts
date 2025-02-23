import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  testEnvironment: 'jsdom',
};

export default jestConfig;
