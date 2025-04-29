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
    },

    // 忽略文件
    ignores: ['**/dist/**', '**/node_modules/**'],
  },
)
