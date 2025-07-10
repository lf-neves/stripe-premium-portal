import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { readFileSync } from "fs";
import path from "path";

// Assume tsconfig.json is in the same folder as this config file
const tsconfig = JSON.parse(
  readFileSync(path.resolve(__dirname, "tsconfig.json"), "utf-8")
);

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  rootDir: ".",
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }],
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths || {},
    {
      prefix: "<rootDir>/",
    }
  ),
  setupFilesAfterEnv: ["<rootDir>/setupFilesAfterEnv.ts"],
};

export default config;
