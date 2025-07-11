import js from "@eslint/js";
import json from "@eslint/json";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
      js,
      perfectionist,
    },
    extends: ["js/recommended"],
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          groups: [["builtin", "external"], "internal"],
          customGroups: [
            {
              elementNamePattern: "@/.*",
              groupName: "internal",
            },
          ],
        },
      ],

      "perfectionist/sort-exports": "error",
      "perfectionist/sort-named-imports": "error",
      "perfectionist/sort-named-exports": "error",
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
      "services/api-service/src/graphql/generatedTypes.ts",
      "libs/database/src/generated",
    ],
  },
]);
