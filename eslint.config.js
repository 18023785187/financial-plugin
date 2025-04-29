import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginCheckFile from "eslint-plugin-check-file";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "/node_modules",
      "/dist",
      "pnpm-lock.yaml",
      ".idea",
      ".vscode",
    ],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  // 自定义校验
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        // 声明chrome为全局只读
        chrome: "readonly",
      },
      ecmaVersion: 12, // 使用最新的 ECMAScript 语法
      sourceType: "module", // 代码是 ECMAScript 模块
      parserOptions: { parser: tseslint.parser },
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境中警告 console 使用，开发环境中关闭规则
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境中警告 debugger 使用，开发环境中关闭规则
      indent: ["warn", 2], // 缩进使用 2 个空格 而不是 4 个  error
      "linebreak-style": ["warn", "windows"], // 使用 Unix 风格的换行符
      quotes: ["warn", "single"], // 使用单引号
      semi: ["warn", "never"], // 语句末尾不加分号
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off"
    },
  },
  // 文件夹和文件名校验，限制除 .d.ts 或 App.vue 外的文件夹和文件名都是短横线形式命名
  {
    plugins: {
      'check-file': pluginCheckFile
    },
    rules: {
      'check-file/filename-naming-convention': ['error', {
        '**/!(*.d.ts|App.vue)': 'KEBAB_CASE'
      }],
      'check-file/folder-naming-convention': ['error', {
        'src/**/': 'KEBAB_CASE'
      }],
      'check-file/no-index': 'off',
    }
  }
]);
