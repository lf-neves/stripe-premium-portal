import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./routes/graphql/schema/**",
  generates: {
    "routes/graphql/generatedTypes.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
