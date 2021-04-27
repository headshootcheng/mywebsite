module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: { jsx: true },
    sourceType: "module",
  },
  plugins: ["prettier", "unused-imports"], // use plugin
  extends: [
    "plugin:react/recommended", // as prettier has different set of rule,
    "plugin:prettier/recommended", // we use the recommended set
  ],
  rules: {
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
