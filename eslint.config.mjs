import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    ignores: ["dist/**/*"]
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      sourceType: "module"
    },
    rules: {
      semi: ["error", "never"],
      quotes: ["error", "double"],
      "comma-dangle": ["error", "never"]
    }
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin
    },
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked
    ],
    rules: {
      "@/semi": ["error", "never"],
      "@/quotes": ["error", "double"],
      "@/comma-dangle": ["error", "never"],
      "comma-dangle": "off"
    }
  }
])
