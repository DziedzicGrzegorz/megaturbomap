module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
    extends: [
        "eslint:recommended",
        "turbo", 'plugin:@typescript-eslint/recommended',
    ],
    env: {
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    overrides: [
        {
            files: ["**/__tests__/**/*"],
            env: {
                jest: true,
            },
        },
    ],
    rules: {
        // Define any custom ESLint rules that you want here.
      "no-multiple-empty-lines": ["error", { "max": 1 }],
    }
};
