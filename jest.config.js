module.exports = {
    verbose: true,

    testMatch: ['**/src/**/*.test.[jt]s?(x)'],

    moduleFileExtensions: ['js', 'json'],

    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
    },

    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'],

    coverageReporters: ['html', 'text-summary'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
