import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";

const projectRoot = process.cwd();
const typeDefsGlob = path.join(projectRoot, "**/*.graphql");

export const typeDefs = loadFilesSync(typeDefsGlob, {
  extensions: ["graphql"],
});
