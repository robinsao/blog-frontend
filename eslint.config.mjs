import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = defineConfig([
  js.configs.recommended,
  compat.config({
    extends: [
      "next",
      "next/core-web-vitals",
      "next/typescript",
      "google",
      "prettier",
    ],
  }),
  {
    rules: {
      "valid-jsdoc": 0,
      "require-jsdoc": 0,
    },
  },
]);

export default eslintConfig;
