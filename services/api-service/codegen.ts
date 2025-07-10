import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/schema/**",
  generates: {
    "src/graphql/generatedTypes.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
  config: {
    typesPrefix: "GraphQL",
  },
};

export default config;
