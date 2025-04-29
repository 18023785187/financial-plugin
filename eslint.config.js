import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // 启用所有功能
    vue: true,
    typescript: true,

    languageOptions: {
      globals: {
        // 声明chrome为全局只读
        chrome: 'readonly',
      },
    },
    // 自定义规则
    rules: {
      'no-console': 'off',
      'vue/multi-word-component-names': 'off',
      'node/prefer-global/process': 'off',
      'eqeqeq': 'off', // 允许使用 == 比较
      'ts/no-empty-object-type': 'off',
      // 强制模板中的标签名为短横线格式
      "vue/component-name-in-template-casing": [
        "error",
        "kebab-case",
        {
          registeredComponentsOnly: false, // 检查所有组件（包括全局注册的）
          ignores: [], // 无需忽略的文件
        },
      ],
    },

    // 忽略文件
    ignores: ['**/dist/**', '**/node_modules/**'],
  },
)
