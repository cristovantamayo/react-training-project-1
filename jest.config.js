module.exports = {
  testEnvironment: 'jest-fixed-jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

  transform: {
    "^.+\\.jsx?$": "babel-jest", // Transpile JavaScript/JSX files
    "^.+\\.mjs$": "babel-jest",  // Transpile .mjs (ES Modules) files
  },
  extensionsToTreatAsEsm: [".ts", ".tsx", ".mjs"],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
