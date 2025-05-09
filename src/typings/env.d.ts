/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  __: unknown
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  // biome-ignore lint/complexity/noBannedTypes: reason
  const component: DefineComponent<{}, {}, any>
  export default component
}
