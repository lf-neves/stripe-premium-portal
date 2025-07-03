import { fileURLToPath } from "url";
import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";

// This gives you the current file's directory
const __filename = fileURLToPath(import.meta.url);

// Now join once with 'typeDefs/**/*.graphql'
const typeDefsGlob = path.join(path.dirname(__filename), "**/*.graphql");

export const typeDefs = loadFilesSync(typeDefsGlob, {
  extensions: ["graphql"],
});
