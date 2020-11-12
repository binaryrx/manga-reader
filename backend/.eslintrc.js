/* eslint-disable linebreak-style */
module.exports = {
    env: {
        browser: true,
        // eslint-disable-next-line linebreak-style
        commonjs: true,
        es2021: true
    },
    extends: [
        'airbnb-base'
    ],
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
        indent: ['error', 4],
        semi: ['error'],
        'comma-dangle': ['error', 'never'],
        'linebreak-style': ['error', 'windows'],
        'max-len': ['error', 140],
        'no-console': ['error', { allow: ['warn', 'error', 'log', 'time', 'timeEnd'] }]
    }
};
