import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx,js}"],
    ignores: ["node_modules/", "dist/", "build/"],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      "no-undef": "off", // fixes module not defined
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-require-imports": "off", // allow require
      "no-unused-vars": "off",
    },
  },
];
