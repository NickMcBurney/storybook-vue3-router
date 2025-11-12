import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const bundle = config => ({
  ...config,
  input: 'src/index.ts',
  external: ['@storybook/vue3', 'vue'],
})

export default [
  bundle({
    plugins: [esbuild()],
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts({
      compilerOptions: {
        preserveSymlinks: false
      }
    })],
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
  }),
]