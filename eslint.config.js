// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [eslint.configs.strict, ...tseslint.configs.recommended],
  rules: {
    semi: "error",
    "prefer-const": "error",
    "no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    quotes: [1, "single"],
    indent: ["error", "tab"],
    "comma-dangle": ["warn", "only-multiline"],
    curly: ["error"],
    "jsx-quotes": ["error", "prefer-double"],
  },
  ignores: ["src/utils/firestorePaths.ts"],
});
