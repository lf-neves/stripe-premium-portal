import { FlatCompat } from "@eslint/eslintrc";

const projectRoot = process.cwd();
const compat = new FlatCompat({
  baseDirectory: projectRoot,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
