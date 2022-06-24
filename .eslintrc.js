module.exports = {
    parser: '@babel/eslint-parser',
    root: true,
    env: {
        node: true,
        browser: true,
        'jest/globals': true,
        es6: true
    },
    plugins: ['jest'],
    settings: {
        jest: {
            version: 'latest'
        }
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:jest/recommended'],
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-loss-of-precision': 'off',
        'no-nonoctal-decimal-escape': 'off',
        'no-unsafe-optional-chaining': 'off',
        'no-useless-backreference': 'off',
        'max-len': ['error', { code: 120 }],
        'linebreak-style': ['error', 'unix']
    },
    overrides: [
        {
            files: ['**/*.test.{j,t}s?(x)'],
            env: {
                jest: true
            },
            plugins: ['jest'],
            rules: {}
        }
    ]
};
