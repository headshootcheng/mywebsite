module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: { jsx: true },
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  plugins: ["prettier", "unused-imports", "@typescript-eslint"], // use plugin
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended", // as prettier has different set of rule,
    "plugin:prettier/recommended", // we use the recommended set
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "warn", // : any
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-inferrable-types": "off", // allow typing default variables
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-var-requires": "off", // Using require('...')
    "react/react-in-jsx-scope": "off", // must include import from react, otherwise show error
    "prettier/prettier": "warn", // styling warning based on prettier
    "react/prop-types": "off",
    "prefer-const": "warn", // const type is preferred
    "jsx-a11y/anchor-is-valid": "off",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": "warn",
  },
  ignorePatterns: ["generated*"],
};
