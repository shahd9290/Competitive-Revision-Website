// jest.config.ts

import nextJest from 'next/jest';
import type { Config } from '@jest/types';

// Configure Next.js + Jest
const createJestConfig = nextJest({
  dir: './',
});

// Custom Jest configuration
const customJestConfig: Config.InitialOptions = {
  testTimeout: 30000,
  clearMocks: true,

  // Enable coverage collection
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',


  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],


  // Jest and jest-preview transforms
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    '^.+\\.(css|scss|sass|less)$': 'jest-preview/transforms/css',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': 'jest-preview/transforms/file',
  },

  transformIgnorePatterns: ['/node_modules/'],
};

export default createJestConfig(customJestConfig);
