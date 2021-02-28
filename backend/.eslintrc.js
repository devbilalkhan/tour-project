module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  parser: "@typescript-eslint/parser",
  plugins: ["simple-import-sort", "json"],
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
    sourceType: "module", // Allows using import/export statements
    ecmaFeatures: {
      jsx: false, // Enable JSX since we're using React
    },
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the react version
    },
  },
  env: {
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended", // Make this the last element so prettier config overrides other formatting rules
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
  ],
  rules: {
    "prettier/prettier": ["error", { usePrettierrc: true }], // Use our .prettierrc file as source
    "@typescript-eslint/no-var-requires": 0,
    quotes: [2, "double", { avoidEscape: true }],
  },
};
