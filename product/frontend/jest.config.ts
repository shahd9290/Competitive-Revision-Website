// jest.config.ts

import nextJest from 'next/jest';
import type { Config } from '@jest/types';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config.InitialOptions = {
  testTimeout: 30000,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  testEnvironment: 'jsdom',

  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    "!**/.next/**"

  ],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',

    // Optional CSS & asset mocks (jest-preview handles this with transforms too)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg|ico|bmp)$': '<rootDir>/__mocks__/fileMock.js',
  },

  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],

    // 👇 These two are for jest-preview support
    '^.+\\.(css|scss|sass|less)$': 'jest-preview/transforms/css',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': 'jest-preview/transforms/file',
  },

  transformIgnorePatterns: [
    '/node_modules/',
    // Removed: '^.+\\.module\\.(css|sass|scss)$'
  ],
};

export default createJestConfig(customJestConfig);
