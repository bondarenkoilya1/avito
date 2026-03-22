import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

import js from "@eslint/js";

const ignoredFiles = [
  "**/dist/**",
  "**/node_modules/**",
  "**/.vite/**",
  "**/public/**",
  "**/.idea/**",
  "**/.vscode/**",
  "jsconfig.json",
  "**/*.min.js",
  "**/*.map.js",
  "**/*.spec.ts",
  "**/.env*"
];

const importSortGroups = [
  ["^react$", "^react-dom$", "^\\w"],
  ["^@/app(/.*|$)"],
  ["^@/pages(/.*|$)"],
  ["^@/widgets(/.*|$)"],
  ["^@/features(/.*|$)"],
  ["^@/entities(/.*|$)"],
  ["^@/shared(/.*|$)"],
  ["^@/shared/types(/.*|$)", "^@/types(/.*|$)", "^\\.\\./types", "^\\./types"],
  ["^.+\\.css$"],
  ["^\\u0000"],
  ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
  ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"]
];

export default [
  { ignores: ignoredFiles },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      prettier: eslintPluginPrettier,
      "simple-import-sort": eslintPluginSimpleImportSort,
      import: importPlugin,
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": eslintPluginReactRefresh
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.app.json"
        },
        node: true
      }
    },
    rules: {
      ...eslintPluginReactHooks.configs.flat.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,

      "simple-import-sort/imports": [
        "error",
        {
          groups: importSortGroups
        }
      ],
      "import/extensions": [
        "error",
        "never",
        {
          ts: "never",
          tsx: "never",
          js: "never",
          jsx: "never",
          json: "always"
        }
      ],

      "prettier/prettier": ["error", { endOfLine: "auto" }],

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true
        }
      ],

      eqeqeq: ["error", "always"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "default-case": "warn",
      curly: ["error", "all"]
    }
  },
  eslintConfigPrettier
];
