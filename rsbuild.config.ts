import { defineConfig } from '@rsbuild/core'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import { parseArgs } from './src/scripts/utils'

const argv = parseArgs({
  port: 2580,
})

export default defineConfig({
  plugins: [pluginVue(), pluginVueJsx(), pluginBabel(), pluginSass()],
  html: {
    template: './public/index.html',
  },
  output: {
    assetPrefix: './',
    filenameHash: false,
    copy: [
      { from: './public/' },
    ],
  },
  source: {
    entry: {
      popup: './src/popup/main.ts',
      background: {
        import: './src/background/main.ts',
        html: false,
      },
      content: {
        import: './src/content/main.ts',
        html: false,
      },
    },
  },
  dev: {
    // dev 输出打包产物，但排除热更新的文件
    writeToDisk: file => !file.includes('.hot-update.'),
  },
  server: {
    strictPort: true,
    port: argv.port,
  },
})
