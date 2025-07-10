import js from "@eslint/js";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
      js,
      "simple-import-sort": simpleImportSort,
    },
    extends: ["js/recommended"],
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"],
  },
  {
    files: ["tests/**/*"],
    plugins: ["jest"],
    env: {
      "jest/globals": true,
    },
  },
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      ".next",
      ".turbo",
      "coverage",
      "out",
      "public",
      "app",
      "vendor",
      "services/api-service/routes/graphql/generatedTypes.ts",
      "libs/database/src/generated",
    ],
  },
]);
