// jest.config.mjs
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { pathsToModuleNameMapper } from "ts-jest";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tsconfig = JSON.parse(
  readFileSync(path.join(__dirname, "tsconfig.base.json"), "utf-8")
);

export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
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
};
