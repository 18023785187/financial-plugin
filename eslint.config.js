import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginCheckFile from "eslint-plugin-check-file";
import pluginImport from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["/node_modules", "/dist", "pnpm-lock.yaml", ".idea", ".vscode"],
  },
  {
    plugins: {
      import: pluginImport, // 启用 import 插件
    },
    rules: {
      'import/order': 'error',
      'import/export': 'off',
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      'import/default': 'off',
    }
  },
  {
    files: ["src/**/*.{js,jsx,mjs,cjs,ts,tsx,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  // 自定义校验
  {
    files: ["src/**/*.{js,jsx,mjs,cjs,ts,tsx,vue}"],
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
      // #region js
      quotes: ["warn", "single"], // 使用单引号
      semi: ["warn", "never"], // 语句末尾不加分号
      "prefer-template": "error", // 强制使用模板字符串替代字符串拼接
      "no-useless-concat": "error", // 禁止无意义的字符串拼接（如 "a" + "b"）
      "no-multi-spaces": ["error", { ignoreEOLComments: true }], // 禁止连续多个空格（缩进除外）
      "no-trailing-spaces": "error", // 禁止行末空格
      "no-whitespace-before-property": "error", // 禁止属性前多余空格（如 `obj. prop`）
      "no-multiple-empty-lines": ["error", { max: 1 }], // 限制连续空行（最多1行）
      // #endregion js
      // #region ts
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // #endregion ts
      // #region vue
      // 强制模板中的标签名为短横线格式
      "vue/component-name-in-template-casing": [
        "error",
        "kebab-case",
        {
          registeredComponentsOnly: false, // 检查所有组件（包括全局注册的）
          ignores: [], // 无需忽略的文件
        },
      ],
      // #endregion vue
    },
  },
  // 文件夹和文件名校验，限制除 .d.ts 或 App.vue 外的文件夹和文件名都是短横线形式命名
  {
    plugins: {
      "check-file": pluginCheckFile,
    },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          "src/**/!(*.d.ts|App.vue)": "KEBAB_CASE",
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/": "KEBAB_CASE",
        },
      ],
      "check-file/no-index": "off",
    },
  },
]);
