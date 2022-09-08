/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    collectCoverage: true,
    testMatch: ['**/*.test.tsx'],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
        '/node_modules/(?!@babel/runtime-corejs3)',
    ],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    }
};