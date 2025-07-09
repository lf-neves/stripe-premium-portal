import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";
import { fileURLToPath } from "url";

// This gives you the current file's directory
const __filename = fileURLToPath(import.meta.url);

// Now join once with 'typeDefs/**/*.graphql'
const typeDefsGlob = path.join(path.dirname(__filename), "**/*.graphql");

export const typeDefs = loadFilesSync(typeDefsGlob, {
  extensions: ["graphql"],
});
